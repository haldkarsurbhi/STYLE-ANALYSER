import { AlertCircle, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const RiskSummaryCard = ({ level, count, label, icon: Icon, color }) => {
  return (
    <div style={{
      ...styles.summaryCard,
      borderTop: `4px solid ${color}`,
    }}>
      <div style={styles.summaryHeader}>
        <div style={{...styles.iconBox, backgroundColor: `${color}15`}}>
          <Icon size={24} color={color} />
        </div>
        <span style={{...styles.count, color}}>{count}</span>
      </div>
      <span style={styles.summaryLabel}>{label}</span>
    </div>
  );
};

const RiskTableRow = ({ operation, section, description, level }) => {
  const levelConfig = {
    High: { color: '#8B1E2D', bg: '#FDF2F4', label: 'HIGH' },
    Medium: { color: '#C4841A', bg: '#FDF6E9', label: 'MEDIUM' },
    Low: { color: '#5A5A5A', bg: '#F5F5F5', label: 'LOW' },
  };
  
  const config = levelConfig[level] || levelConfig.Low;

  return (
    <tr style={styles.tableRow}>
      <td style={styles.cell}>
        <span style={styles.operation}>{operation}</span>
      </td>
      <td style={styles.cell}>
        <span style={styles.section}>{section}</span>
      </td>
      <td style={styles.cell}>
        <span style={styles.description}>{description}</span>
      </td>
      <td style={styles.cell}>
        <span style={{
          ...styles.badge,
          backgroundColor: config.bg,
          color: config.color,
        }}>
          {config.label}
        </span>
      </td>
    </tr>
  );
};

const RiskAnalysis = () => {
  const risks = [
    { 
      operation: 'Collar Attachment', 
      section: 'COLLAR', 
      description: 'High skill required for precise alignment. Risk of uneven collar points.',
      level: 'High' 
    },
    { 
      operation: 'Buttonhole Placement', 
      section: 'FRONT', 
      description: 'Critical positioning required. Misalignment affects garment appearance.',
      level: 'High' 
    },
    { 
      operation: 'Pocket Setting', 
      section: 'POCKET', 
      description: 'Alignment with stripes/checks. Corner stitching quality critical.',
      level: 'Medium' 
    },
    { 
      operation: 'Yoke Seam Matching', 
      section: 'YOKE', 
      description: 'Pattern matching at center back. Requires careful handling.',
      level: 'Medium' 
    },
    { 
      operation: 'Sleeve Placket', 
      section: 'SLEEVE', 
      description: 'Small component handling. Topstitch consistency important.',
      level: 'Medium' 
    },
    { 
      operation: 'Side Seam Assembly', 
      section: 'ASSEMBLY', 
      description: 'Standard operation with established SOP.',
      level: 'Low' 
    },
    { 
      operation: 'Hem Stitching', 
      section: 'BOTTOM', 
      description: 'Straight stitch operation. Quality check for evenness.',
      level: 'Low' 
    },
  ];

  const highRisks = risks.filter(r => r.level === 'High').length;
  const mediumRisks = risks.filter(r => r.level === 'Medium').length;
  const lowRisks = risks.filter(r => r.level === 'Low').length;

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Risk Check</h1>
        <p style={styles.pageSubtitle}>
          Production and quality risk assessment based on style complexity
        </p>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <RiskSummaryCard 
          level="high" 
          count={highRisks} 
          label="High Risk" 
          icon={AlertCircle}
          color="#8B1E2D"
        />
        <RiskSummaryCard 
          level="medium" 
          count={mediumRisks} 
          label="Medium Risk" 
          icon={AlertTriangle}
          color="#C4841A"
        />
        <RiskSummaryCard 
          level="low" 
          count={lowRisks} 
          label="Low Risk" 
          icon={CheckCircle}
          color="#5A5A5A"
        />
      </div>

      {/* Risk Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={styles.tableTitleSection}>
            <Shield size={20} color="#8B1E2D" />
            <h2 style={styles.tableTitle}>Risk Assessment Details</h2>
          </div>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headCell}>OPERATION</th>
              <th style={styles.headCell}>SECTION</th>
              <th style={{...styles.headCell, minWidth: '300px'}}>RISK DESCRIPTION</th>
              <th style={styles.headCell}>LEVEL</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, i) => (
              <RiskTableRow key={i} {...risk} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Guidelines */}
      <div style={styles.guidelinesCard}>
        <h3 style={styles.guidelinesTitle}>Risk Mitigation Guidelines</h3>
        <div style={styles.guidelinesGrid}>
          <div style={styles.guidelineItem}>
            <span style={styles.guidelineLabel}>High Risk</span>
            <p style={styles.guidelineText}>Require skilled operators. Implement 100% inline inspection. Consider jigs/fixtures.</p>
          </div>
          <div style={styles.guidelineItem}>
            <span style={styles.guidelineLabel}>Medium Risk</span>
            <p style={styles.guidelineText}>Standard operators with supervision. Spot checks at 30% frequency.</p>
          </div>
          <div style={styles.guidelineItem}>
            <span style={styles.guidelineLabel}>Low Risk</span>
            <p style={styles.guidelineText}>General operators. Standard quality checks apply.</p>
          </div>
        </div>
      </div>
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
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: '36px',
    fontWeight: 800,
    lineHeight: 1,
  },
  summaryLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    marginBottom: '24px',
  },
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #F0F0F0',
  },
  tableTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tableTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#2B2B2B',
    letterSpacing: '0.02em',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  headCell: {
    padding: '16px 24px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#6B6B6B',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #E5E5E5',
  },
  tableRow: {
    borderBottom: '1px solid #F0F0F0',
    transition: 'background-color 150ms ease',
  },
  cell: {
    padding: '20px 24px',
    verticalAlign: 'top',
  },
  operation: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#2B2B2B',
  },
  section: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#8B1E2D',
    letterSpacing: '0.02em',
  },
  description: {
    fontSize: '14px',
    color: '#4A4A4A',
    lineHeight: 1.6,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  guidelinesCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  guidelinesTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#2B2B2B',
    marginBottom: '20px',
    letterSpacing: '0.02em',
  },
  guidelinesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  guidelineItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  guidelineLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  guidelineText: {
    fontSize: '13px',
    color: '#6B6B6B',
    lineHeight: 1.6,
  },
};

export default RiskAnalysis;
