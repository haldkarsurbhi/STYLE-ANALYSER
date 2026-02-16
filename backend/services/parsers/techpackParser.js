/**
 * Tech Pack Parser - Extracts structured garment construction data
 * Output optimized for: Pre-production, IE, sampling, factory setup
 */
import fs from 'fs';
import pdf from 'pdf-parse';

// Clean whitespace from line
function clean(line) {
  return line.replace(/\s+/g, ' ').trim();
}

// Check if string has numbers
function hasNumber(str) {
  return /\d/.test(str);
}

// Extract number with unit from text
function extractMeasurement(text) {
  // Match patterns like: "42mm", "42 mm", "1.5 inch", "3/4"
  const matches = text.match(/(\d+\.?\d*\s*(?:mm|cm|inch|in|\"|\')|\d+\/\d+(?:\s*(?:mm|cm|inch|in))?)/gi);
  return matches ? matches.map(m => m.trim()) : [];
}

// Extract stitch type
function extractStitch(text) {
  const stitches = ['SNLS', 'DNCS', 'DNLS', 'OL', 'FLATLOCK', 'COVERSTITCH', 'BARTACK'];
  const found = stitches.find(s => text.toUpperCase().includes(s));
  return found || null;
}

// Extract SPI (stitches per inch)
function extractSPI(text) {
  const match = text.match(/SPI[:\s]*(\d+[-–]?\d*)/i);
  return match ? match[1] : null;
}

// Extract gauge
function extractGauge(text) {
  const match = text.match(/GAUGE[:\s]*(\d+)/i);
  return match ? match[1] : null;
}

// Identify collar type
function identifyCollarType(text) {
  const types = {
    'REGULAR CUTAWAY': 'Regular Cutaway',
    'CUTAWAY': 'Cutaway',
    'STRAIGHT': 'Straight',
    'BUTTON DOWN': 'Button Down',
    'MANDARIN': 'Mandarin',
    'SPREAD': 'Spread',
    'WING': 'Wing',
    'CLUB': 'Club'
  };

  const upper = text.toUpperCase();
  for (const [key, value] of Object.entries(types)) {
    if (upper.includes(key)) return value;
  }
  return null;
}

// Parse single measurement line
function parseMeasurementLine(line) {
  const result = {
    parameter: null,
    value: null,
    unit: null
  };

  // Clean the line
  const cleanLine = clean(line);

  // Extract value with unit
  const valueMatch = cleanLine.match(/(\d+\.?\d*)\s*(mm|cm|inch|in|\"|\')/i);
  if (valueMatch) {
    result.value = valueMatch[1];
    result.unit = valueMatch[2].toLowerCase() === 'in' ? 'inch' : valueMatch[2].toLowerCase();
  }

  // Extract parameter name (text before the number)
  const paramMatch = cleanLine.match(/^([A-Za-z\s\-]+?)(?:\s*[:\-–])?\s*\d/);
  if (paramMatch) {
    result.parameter = clean(paramMatch[1]).replace(/[:\-–]$/, '').trim();
  }

  return result.parameter && result.value ? result : null;
}

// Main parse function
function parseTechPack(text) {
  const lines = text
    .split('\n')
    .map(l => clean(l))
    .filter(l => l.length > 2); // Remove very short lines

  // Initialize result structure
  const result = {
    collar: {
      type: null,
      measurements: [],
      stitchGauge: [],
      notes: []
    },
    assembly: {
      type: null,
      measurements: [],
      stitchGauge: [],
      notes: []
    },
    yoke: {
      type: null,
      measurements: [],
      stitchGauge: [],
      notes: []
    },
    front: {
      type: null,
      measurements: [],
      stitchGauge: [],
      notes: []
    },
    back: {
      type: null,
      measurements: [],
      stitchGauge: [],
      notes: []
    },
    pocket: {
      type: null,
      measurements: [],
      stitchGauge: [],
      notes: []
    }
  };

  let currentSection = null;
  let sectionBuffer = [];

  // Section detection keywords
  const sectionKeywords = {
    collar: ['COLLAR', 'COLLAR BAND', 'COLLAR STAND'],
    assembly: ['ASSEMBLY', 'SIDE SEAM', 'SHOULDER SEAM', 'FINISHING'],
    yoke: ['YOKE', 'BACK YOKE'],
    front: ['FRONT', 'FRONT PANEL', 'FRONT PLACKET', 'BUTTON STAND'],
    back: ['BACK', 'BACK PANEL'],
    pocket: ['POCKET', 'CHEST POCKET', 'HIP POCKET']
  };

  function detectSection(line) {
    const upper = line.toUpperCase();
    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(kw => upper.includes(kw))) {
        return section;
      }
    }
    return null;
  }

  // Process each line
  lines.forEach((line, index) => {
    const upper = line.toUpperCase();

    // Detect section change
    const detectedSection = detectSection(line);
    if (detectedSection) {
      currentSection = detectedSection;
      return; // Skip the header line itself
    }

    if (!currentSection) return;

    // Skip garbage lines (only numbers, no context)
    if (/^\d+\.?\d*$/.test(line)) return;
    if (line.length < 5) return;

    // Extract collar type
    if (currentSection === 'collar') {
      const collarType = identifyCollarType(line);
      if (collarType && !result.collar.type) {
        result.collar.type = collarType;
      }
    }

    // Parse measurements
    const measurement = parseMeasurementLine(line);
    if (measurement) {
      // Avoid duplicates
      const exists = result[currentSection].measurements.some(
        m => m.parameter === measurement.parameter && m.value === measurement.value
      );
      if (!exists) {
        result[currentSection].measurements.push(measurement);
      }
      return;
    }

    // Extract stitch and gauge info
    const stitch = extractStitch(line);
    const spi = extractSPI(line);
    const gauge = extractGauge(line);

    if (stitch || spi || gauge) {
      const stitchInfo = {
        stitch: stitch,
        spi: spi,
        gauge: gauge
      };

      // Check for duplicates
      const exists = result[currentSection].stitchGauge.some(
        sg => sg.stitch === stitchInfo.stitch && sg.spi === stitchInfo.spi
      );
      if (!exists && (stitch || spi || gauge)) {
        result[currentSection].stitchGauge.push(stitchInfo);
      }
      return;
    }

    // Extract notes/sequence (FOA, BACK TACK, etc.)
    const noteKeywords = ['FOA', 'BACK TACK', 'BEFORE', 'AFTER', 'ATTACH', 'TOPSTITCH', 'EDGE STITCH', 'RUN', 'FOLD'];
    if (noteKeywords.some(kw => upper.includes(kw))) {
      // Clean up the note
      const cleanNote = line.replace(/\s+/g, ' ').trim();
      if (!result[currentSection].notes.includes(cleanNote)) {
        result[currentSection].notes.push(cleanNote);
      }
    }
  });

  return result;
}

// Extract text from PDF file
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('[ERROR] PDF extraction failed:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export { parseTechPack, extractTextFromPDF };
