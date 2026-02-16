import { useState } from 'react';
import { Upload, FileText, ChevronDown, ChevronUp, Ruler, Settings2, ClipboardList } from 'lucide-react';
import { uploadTechPack } from '../api/api';

const SectionCard = ({ title, data, isOpen, onToggle }) => {
  const hasData = data && (data.type || data.measurements?.length > 0);

  return (
    <div style={{
      ...styles.card,
      borderLeft: hasData ? '4px solid #b87333' : '4px solid #1e3354',
    }}>
      <button onClick={onToggle} style={styles.cardHeader}>
        <div style={styles.cardTitleSection}>
          <FileText size={20} color={hasData ? '#d4904a' : '#5a6b82'} />
          <div>
            <h3 style={styles.cardTitle}>{title}</h3>
            {data?.type && <span style={styles.cardType}>{data.type}</span>}
          </div>
        </div>
        <div style={{
          ...styles.statusBadge,
          backgroundColor: hasData ? 'rgba(34, 197, 94, 0.15)' : 'rgba(90, 107, 130, 0.15)',
          color: hasData ? '#22c55e' : '#5a6b82',
        }}>
          {hasData ? 'DATA EXTRACTED' : 'NO DATA'}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && hasData && (
        <div style={styles.cardContent}>
          {data.measurements?.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Ruler size={16} color="#b87333" />
                <span style={styles.sectionLabel}>Measurements</span>
              </div>
              <div style={styles.measurementsGrid}>
                {data.measurements.map((m, i) => (
                  <div key={i} style={styles.measurementItem}>
                    <span style={styles.measurementValue}>{m.value}</span>
                    <span style={styles.measurementUnit}>{m.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(data.stitch || data.spi || data.gauge) && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Settings2 size={16} color="#b87333" />
                <span style={styles.sectionLabel}>Machine Specifications</span>
              </div>
              <div style={styles.specsRow}>
                {data.stitch && <span style={styles.specBadge}>{data.stitch}</span>}
                {data.spi && <span style={styles.specBadge}>SPI: {data.spi}</span>}
                {data.gauge && <span style={styles.specBadge}>GAUGE: {data.gauge}</span>}
              </div>
            </div>
          )}

          {data.instructions?.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <ClipboardList size={16} color="#b87333" />
                <span style={styles.sectionLabel}>Construction Instructions</span>
              </div>
              <ul style={styles.instructionList}>
                {data.instructions.map((inst, i) => (
                  <li key={i} style={styles.instructionItem}>{inst}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TechPackAnalysis = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({});

  const sections = ['Collar', 'Assembly', 'Sleeve', 'Front', 'Back', 'Pocket'];

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('techpack', file);

    try {
      const data = await uploadTechPack(formData);
      setResult(data.data);
      const allExpanded = sections.reduce((acc, s) => ({ ...acc, [s.toLowerCase()]: true }), {});
      setExpanded(allExpanded);
    } catch (err) {
      setError(err.userMessage || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section.toLowerCase()]: !prev[section.toLowerCase()] }));
  };

  return (
    <div>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>TECH PACK ANALYSIS</h1>
          <p style={styles.pageSubtitle}>Extract and analyze garment construction specifications</p>
        </div>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadPanel}>
        <div style={styles.uploadGrid}>
          <div style={styles.uploadBox}>
            <Upload size={32} color="#b87333" />
            <div style={styles.uploadContent}>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
                id="techpack-upload"
              />
              <label htmlFor="techpack-upload" style={styles.fileLabel}>
                {file ? file.name : 'Drop PDF here or click to browse'}
              </label>
              <p style={styles.fileHint}>Supported: PDF files up to 10MB</p>
            </div>
          </div>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            style={{
              ...styles.analyzeBtn,
              opacity: !file || loading ? 0.5 : 1,
            }}
          >
            {loading ? 'PROCESSING...' : 'ANALYZE DOCUMENT'}
          </button>
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <div style={styles.resultsSection}>
          <div style={styles.resultsHeader}>
            <div>
              <h2 style={styles.resultsTitle}>EXTRACTION RESULTS</h2>
              <p style={styles.resultsSubtitle}>Document processed successfully</p>
            </div>
            <button
              onClick={() => {
                const allOpen = sections.every(s => expanded[s.toLowerCase()]);
                const newState = sections.reduce((acc, s) => ({ ...acc, [s.toLowerCase()]: !allOpen }), {});
                setExpanded(newState);
              }}
              style={styles.toggleBtn}
            >
              {sections.every(s => expanded[s.toLowerCase()]) ? 'COLLAPSE ALL' : 'EXPAND ALL'}
            </button>
          </div>

          <div style={styles.cardsGrid}>
            {sections.map(section => (
              <SectionCard
                key={section}
                title={section}
                data={result[section.toLowerCase()]}
                isOpen={expanded[section.toLowerCase()]}
                onToggle={() => toggleSection(section)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageHeader: {
    marginBottom: '24px',
  },
  pageTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  pageSubtitle: {
    fontSize: '13px',
    color: '#7a8ba3',
  },
  uploadPanel: {
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
  },
  uploadGrid: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  uploadBox: {
    flex: 1,
    minWidth: '300px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#162642',
    border: '2px dashed #1e3354',
    borderRadius: '6px',
  },
  uploadContent: {
    flex: 1,
  },
  fileLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#9aa8bc',
    cursor: 'pointer',
    marginBottom: '4px',
  },
  fileHint: {
    fontSize: '12px',
    color: '#5a6b82',
  },
  analyzeBtn: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #b87333, #8a5a28)',
    border: 'none',
    borderRadius: '4px',
    color: '#ffffff',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  errorText: {
    marginTop: '16px',
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '4px',
    color: '#ef4444',
    fontSize: '13px',
  },
  resultsSection: {
    marginTop: '32px',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  resultsTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '1px',
  },
  resultsSubtitle: {
    fontSize: '12px',
    color: '#7a8ba3',
  },
  toggleBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #b87333',
    borderRadius: '4px',
    color: '#b87333',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '1px',
    cursor: 'pointer',
  },
  cardsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    backgroundColor: '#0f1d32',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #1e3354',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#ffffff',
  },
  cardTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  cardTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#ffffff',
  },
  cardType: {
    fontSize: '12px',
    color: '#7a8ba3',
    marginTop: '2px',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
  cardContent: {
    padding: '20px',
    borderTop: '1px solid #1e3354',
  },
  section: {
    marginBottom: '20px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#5a6b82',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  measurementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  measurementItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    padding: '12px 16px',
    backgroundColor: '#162642',
    borderRadius: '4px',
  },
  measurementValue: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
  },
  measurementUnit: {
    fontSize: '12px',
    color: '#7a8ba3',
    textTransform: 'uppercase',
  },
  specsRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  specBadge: {
    padding: '10px 18px',
    backgroundColor: 'rgba(184, 115, 51, 0.15)',
    color: '#d4904a',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
  instructionList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  instructionItem: {
    padding: '14px 16px',
    backgroundColor: '#162642',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#9aa8bc',
    lineHeight: '1.6',
    borderLeft: '3px solid #1e3354',
  },
};

export default TechPackAnalysis;
