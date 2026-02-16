const GARMENT_ZONES = {
  collar: ["neck", "collar", "band"],
  assembly: ["sleeve", "armhole", "assembly", "construction", "sewing"],
  cuff: ["cuff", "hem"], // Map to assembly or specific if needed
  front: ["front", "placket", "button", "btn", "opening"],
  back: ["back", "yoke", "pleat"],
  pocket: ["pocket"],
  yoke: ["yoke"],
};

// Regex patterns
const MEASUREMENT_REGEX = /((\d+\s?\/\s?\d+)|(\d+(\.\d+)?))\s?(mm|cm|"|inch|"|')/gi;
const TIME_REGEX = /(\d+(\.\d+)?)\s?s/i;
const STITCH_REGEX = /\b(SNLS|DNCS|T\/S|S\/B|SPI|Box stitch|Lock stitch)\b/i;
const CONSTRUCTION_REGEX = /(back tack|double fold|clean finish|raw edge|binding|facing)/i;

const IGNORE_PATTERNS = [
  /buyer/i, /style ref/i, /order no/i, /season/i, /modified/i,
  /main label/i, /size label/i, /w\/c label/i, /barcode/i,
  /dressed/i, /cotton/i, /brand/i, /logo/i
];

const RELEVANT_MEASUREMENT_KEYWORDS = [
  "margin", "hem", "seam", "stand", "height", "width", "placket",
  "cuff", "opening", "allowance", "depth", "run", "spread"
];

function inferComponent(text) {
  const t = text.toLowerCase();
  for (const [comp, keywords] of Object.entries(GARMENT_ZONES)) {
    if (keywords.some((k) => t.includes(k))) {
      // Map 'cuff' to 'assembly' if cuff section doesn't exist in frontend
      if (comp === "cuff") return "assembly";
      return comp;
    }
  }
  return "unknown"; // Default bucket
}

function parseTechPack(text) {
  // Initialize structure expected by Frontend
  const result = {
    collar: { measurements: [], stitchGauge: [], notes: [] },
    assembly: { measurements: [], stitchGauge: [], notes: [] },
    front: { measurements: [], stitchGauge: [], notes: [] },
    back: { measurements: [], stitchGauge: [], notes: [] },
    yoke: { measurements: [], stitchGauge: [], notes: [] },
    pocket: { measurements: [], stitchGauge: [], notes: [] },
    unknown: { measurements: [], stitchGauge: [], notes: [] } // Catch-all
  };

  if (!text) {
    console.log("PARSER ERROR: Text is empty or null");
    return result;
  }

  console.log("PARSER INPUT TEXT PREVIEW:", text.substring(0, 200));

  const lines = text.split(/\r?\n/);
  console.log("PARSER: Split into", lines.length, "lines");

  let currentContext = "unknown";

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    // 0. CHECK BLOCKLIST
    if (IGNORE_PATTERNS.some(p => p.test(line))) {
      console.log(`PARSER: Ignored marketing/info line: "${line.substring(0, 30)}..."`);
      return;
    }

    // 1. Infer Component Context from line content
    const inferred = inferComponent(line);
    if (inferred !== "unknown") {
      console.log(`PARSER: Switch context to '${inferred}' at line: "${line.substring(0, 50)}..."`);
      currentContext = inferred;
      // Don't return, line might contain data
    }

    // 2. Extract Measurements
    let match;
    // Reset regex lastIndex for global iteration
    MEASUREMENT_REGEX.lastIndex = 0;
    let measurementFound = false;

    while ((match = MEASUREMENT_REGEX.exec(line)) !== null) {
      const parameter = line.replace(match[0], "").trim();

      // Check if parameter contains relevant keywords
      const isRelevant = RELEVANT_MEASUREMENT_KEYWORDS.some(k => parameter.toLowerCase().includes(k));

      if (isRelevant || parameter.length < 30) { // Keep if relevant OR if it's a short clean label (fallback)
        console.log(`PARSER: Found measurement '${match[0]}' for '${parameter}'`);
        if (result[currentContext]) {
          result[currentContext].measurements.push({
            parameter: parameter || "Measurement",
            value: match[1],
            unit: match[5] || match[3] || "unit",
          });
          measurementFound = true;
        }
      }
    }

    // 3. Extract Processes / Stitches / Construction
    const timeMatch = line.match(TIME_REGEX);
    const stitchMatch = line.match(STITCH_REGEX);
    const constructionMatch = line.match(CONSTRUCTION_REGEX);
    const isAutomation = /auto|pneumatic|operation/i.test(line);

    if (stitchMatch || timeMatch || constructionMatch || isAutomation) {
      if (result[currentContext]) {
        const detail = stitchMatch ? stitchMatch[0] : (constructionMatch ? constructionMatch[0] : "Process");

        // Avoid duplicates if this line was already added as measurement
        if (!measurementFound) {
          result[currentContext].stitchGauge.push({
            stitch: detail,
            spi: line.match(/SPI\s?(\d+)/i)?.[1] || null,
            gauge: null,
            time: timeMatch ? timeMatch[0] : null,
            automation: isAutomation ? "Yes" : "No"
          });
        }
      }
    }

    // 4. Notes - Only keep technical notes that weren't captured above
    if (!match && !stitchMatch && !constructionMatch && line.length > 5 && line.length < 100) {
      if (result[currentContext]) {
        // Filter out generic short lines that are likely noise
        if (!/spec actual|modified|page|sheet/i.test(line)) {
          result[currentContext].notes.push(line);
        }
      }
    }
  });

  return result;
}

module.exports = parseTechPack;
