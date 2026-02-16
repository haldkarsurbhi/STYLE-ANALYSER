import { useState } from 'react';
import { Upload, FileText, ChevronDown, ChevronUp, Ruler, Wrench, Info } from 'lucide-react';

// Section Card Component
const SectionCard = ({ title, subtitle, data, isOpen, onToggle }) => {
  const hasData = data && (data.type || data.measurements?.length > 0 || data.construction);

  return (
    <div style={{
      ...styles.card,
      borderColor: hasData ? '#E5E5E5' : '#EEEEEE',
    }}>
      <button onClick={onToggle} style={styles.cardHeader}>
        <div style={styles.cardTitleSection}>
          <h2 style={styles.cardTitle}>{title}</h2>
          {subtitle && <span style={styles.cardSubtitle}>{subtitle}</span>}
        </div>
        <div style={styles.cardRight}>
          <span style={{
            ...styles.statusBadge,
            backgroundColor: hasData ? '#FDF2F4' : '#F5F5F5',
            color: hasData ? '#8B1E2D' : '#9B9B9B',
          }}>
            {hasData ? 'SPECIFIED' : 'NOT SPECIFIED'}
          </span>
          {isOpen ? <ChevronUp size={20} color="#6B6B6B" /> : <ChevronDown size={20} color="#9B9B9B" />}
        </div>
      </button>

      {isOpen && (
        <div style={styles.cardContent}>
          {!hasData ? (
            <div style={styles.emptyState}>
              <Info size={24} color="#9B9B9B" />
              <p style={styles.emptyText}>Not specified in tech pack</p>
            </div>
          ) : (
            <>
              {/* Type */}
              {data.type && (
                <div style={styles.contentBlock}>
                  <h3 style={styles.blockLabel}>Type</h3>
                  <p style={styles.blockValue}>{data.type}</p>
                </div>
              )}

              {/* Construction Notes */}
              {data.construction?.length > 0 && (
                <div style={styles.contentBlock}>
                  <h3 style={styles.blockLabel}>Construction Notes</h3>
                  <ul style={styles.bulletList}>
                    {data.construction.map((note, i) => (
                      <li key={i} style={styles.bulletItem}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Measurements Table */}
              {data.measurements?.length > 0 && (
                <div style={styles.contentBlock}>
                  <h3 style={styles.blockLabel}>
                    <Ruler size={16} style={styles.blockIcon} />
                    Measurements
                  </h3>
                  <div style={styles.tableWrapper}>
                    <table style={styles.measurementsTable}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}>Parameter</th>
                          <th style={styles.tableHeader}>Value</th>
                          <th style={styles.tableHeader}>Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.measurements.map((m, i) => (
                          <tr key={i}>
                            <td style={styles.tableCell}>{m.parameter}</td>
                            <td style={{...styles.tableCell, fontWeight: 600}}>{m.value}</td>
                            <td style={styles.tableCell}>{m.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Stitching / Specifications */}
              {(data.stitch || data.spi || data.gauge) && (
                <div style={styles.contentBlock}>
                  <h3 style={styles.blockLabel}>
                    <Wrench size={16} style={styles.blockIcon} />
                    Stitching Specifications
                  </h3>
                  <div style={styles.specsGrid}>
                    {data.stitch && (
                      <div style={styles.specItem}>
                        <span style={styles.specLabel}>Stitch Type</span>
                        <span style={styles.specValue}>{data.stitch}</span>
                      </div>
                    )}
                    {data.spi && (
                      <div style={styles.specItem}>
                        <span style={styles.specLabel}>SPI</span>
                        <span style={styles.specValue}>{data.spi}</span>
                      </div>
                    )}
                    {data.gauge && (
                      <div style={styles.specItem}>
                        <span style={styles.specLabel}>Gauge</span>
                        <span style={styles.specValue}>{data.gauge}</span>
                      </div>
                    )}
                    {data.needle && (
                      <div style={styles.specItem}>
                        <span style={styles.specLabel}>Needle</span>
                        <span style={styles.specValue}>{data.needle}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Special Notes */}
              {data.notes && (
                <div style={{...styles.contentBlock, ...styles.notesBlock}}>
                  <h3 style={styles.blockLabel}>Special Notes</h3>
                  <p style={styles.notesText}>{data.notes}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const TechPackAnalysis = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState({});

  // Section order as per requirements: COLLAR, ASSEMBLY, YOKE, FRONT, BACK, POCKET
  const sections = [
    { key: 'collar', title: 'COLLAR' },
    { key: 'assembly', title: 'ASSEMBLY' },
    { key: 'yoke', title: 'YOKE' },
    { key: 'front', title: 'FRONT' },
    { key: 'back', title: 'BACK' },
    { key: 'pocket', title: 'POCKET' },
  ];

  const handleUpload = () => {
    // Mock data for demo - realistic apparel tech pack data
    setResult({
      collar: {
        type: 'Regular Cutaway Collar',
        subtitle: 'Standard Business',
        construction: [
          '2-piece collar with fused interlining',
          'Topstitch 1/4" from edge',
          'Collar stand attached with 1/4" SA',
        ],
        measurements: [
          { parameter: 'Collar Length', value: '16.5', unit: 'inch' },
          { parameter: 'Collar Height (Front)', value: '1.5', unit: 'inch' },
          { parameter: 'Collar Height (Back)', value: '1.75', unit: 'inch' },
          { parameter: 'Point Length', value: '3.0', unit: 'inch' },
        ],
        stitch: 'SNLS',
        spi: '10-12',
        gauge: '16',
        notes: 'Use collar butterfly for precise alignment',
      },
      assembly: {
        type: 'Standard Shirt Construction',
        construction: [
          'Overlock all raw edges',
          'French seams on side seams',
          'Single needle stitch on armhole',
        ],
        measurements: [
          { parameter: 'Side Seam Allowance', value: '3/8', unit: 'inch' },
          { parameter: 'Shoulder Seam', value: '1/4', unit: 'inch' },
        ],
        stitch: '4T OL',
        spi: '8-10',
      },
      yoke: {
        type: 'Split Yoke',
        construction: [
          'Center back box pleat',
          'Matched pattern at CB',
        ],
        measurements: [
          { parameter: 'Yoke Width', value: '4.5', unit: 'inch' },
          { parameter: 'Pleat Depth', value: '3/8', unit: 'inch' },
        ],
        stitch: 'SNLS',
        spi: '10-12',
      },
      front: {
        type: 'Plain Front Panel',
        construction: [
          'Center front placket',
          '7 button holes',
        ],
        measurements: [
          { parameter: 'Front Length', value: '31', unit: 'inch' },
          { parameter: 'Chest Width', value: '23', unit: 'inch' },
          { parameter: 'Placket Width', value: '1.25', unit: 'inch' },
        ],
        stitch: 'SNLS',
        spi: '10-12',
        notes: 'Button positions marked on pattern',
      },
      back: {
        type: 'Plain Back Panel',
        construction: [
          'Side back seams optional',
        ],
        measurements: [
          { parameter: 'Back Length', value: '31', unit: 'inch' },
          { parameter: 'Back Width', value: '23', unit: 'inch' },
        ],
      },
      pocket: {
        type: 'Left Chest Pocket',
        construction: [
          'Double needle topstitch',
          'Reinforced corners',
        ],
        measurements: [
          { parameter: 'Pocket Width', value: '4.5', unit: 'inch' },
          { parameter: 'Pocket Height', value: '5.5', unit: 'inch' },
          { parameter: 'Position from CF', value: '4', unit: 'inch' },
        ],
        stitch: 'DNLS',
        spi: '8-10',
        notes: 'Pocket bag fabric: self fabric',
      },
    });
    
    // Expand all sections by default
    setExpanded({
      collar: true,
      assembly: true,
      yoke: true,
      front: true,
      back: true,
      pocket: true,
    });
  };

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setExpanded({
      collar: true,
      assembly: true,
      yoke: true,
      front: true,
      back: true,
      pocket: true,
    });
  };

  const collapseAll = () => {
    setExpanded({
      collar: false,
      assembly: false,
      yoke: false,
      front: false,
      back: false,
      pocket: false,
    });
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Analyse Style</h1>
        <p style={styles.pageSubtitle}>
          Upload tech pack to extract garment specifications and construction details
        </p>
      </div>

      {/* Upload Area */}
      <div style={styles.uploadSection}>
        <div 
          style={styles.uploadBox}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <div style={styles.uploadIcon}>
            <Upload size={32} color="#8B1E2D" />
          </div>
          <div style={styles.uploadText}>
            <p style={styles.uploadLabel}>
              {file ? file.name : 'Upload Tech Pack PDF'}
            </p>
            <p style={styles.uploadHint}>
              Accepted format: PDF | Max size: 10MB
            </p>
          </div>
        </div>
        <button onClick={handleUpload} style={styles.uploadBtn}>
          <FileText size={18} />
          Analyse Document
        </button>
      </div>

      {/* Results */}
      {result && (
        <div style={styles.resultsSection}>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>TECH PACK ANALYSIS</h2>
            <div style={styles.resultsActions}>
              <button onClick={expandAll} style={styles.actionBtn}>Expand All</button>
              <button onClick={collapseAll} style={styles.actionBtn}>Collapse All</button>
            </div>
          </div>

          <div style={styles.cardsContainer}>
            {sections.map(section => (
              <SectionCard
                key={section.key}
                title={section.title}
                subtitle={result[section.key]?.subtitle}
                data={result[section.key]}
                isOpen={expanded[section.key]}
                onToggle={() => toggleSection(section.key)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '32px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#8B1E2D',
    letterSpacing: '-0.02em',
    marginBottom: '8px',
  },
  pageSubtitle: {
    fontSize: '15px',
    color: '#6B6B6B',
    maxWidth: '600px',
  },
  uploadSection: {
    marginBottom: '48px',
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '32px',
    backgroundColor: '#FAFAFA',
    border: '2px dashed #D5D5D5',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    marginBottom: '16px',
  },
  uploadIcon: {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF2F4',
    borderRadius: '12px',
  },
  uploadText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  uploadLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2B2B2B',
  },
  uploadHint: {
    fontSize: '13px',
    color: '#9B9B9B',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '16px 24px',
    backgroundColor: '#8B1E2D',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  resultsSection: {
    marginTop: '40px',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  resultsTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#8B1E2D',
    letterSpacing: '0.02em',
  },
  resultsActions: {
    display: 'flex',
    gap: '12px',
  },
  actionBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #D5D5D5',
    borderRadius: '6px',
    color: '#6B6B6B',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
  },
  cardTitleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#2B2B2B',
    letterSpacing: '0.02em',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#9B9B9B',
  },
  cardRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: '24px',
    borderTop: '1px solid #F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9B9B9B',
    fontStyle: 'italic',
  },
  contentBlock: {
    marginBottom: '24px',
  },
  blockLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '12px',
  },
  blockIcon: {
    color: '#8B1E2D',
  },
  blockValue: {
    fontSize: '16px',
    color: '#2B2B2B',
    fontWeight: 500,
  },
  bulletList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bulletItem: {
    position: 'relative',
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#4A4A4A',
    lineHeight: 1.6,
  },
  tableWrapper: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  measurementsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  tableHeader: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#6B6B6B',
    backgroundColor: '#F5F5F5',
    borderBottom: '1px solid #E5E5E5',
  },
  tableCell: {
    padding: '12px 16px',
    borderBottom: '1px solid #F0F0F0',
    color: '#4A4A4A',
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
  },
  specLabel: {
    fontSize: '12px',
    color: '#9B9B9B',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  specValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2B2B2B',
  },
  notesBlock: {
    backgroundColor: '#FDF9E8',
    border: '1px solid #F5E6C8',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: 0,
  },
  notesText: {
    fontSize: '14px',
    color: '#6B5B3D',
    lineHeight: 1.6,
  },
};

export default TechPackAnalysis;
