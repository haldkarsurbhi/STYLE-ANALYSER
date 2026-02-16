import { Activity, TrendingUp, TrendingDown, Gauge, Factory, Wrench } from 'lucide-react';

const ScoreGauge = ({ value, label }) => {
  const color = value >= 70 ? '#ef4444' : value >= 50 ? '#f59e0b' : '#22c55e';
  
  return (
    <div style={styles.gaugeContainer}>
      <div style={{ ...styles.gaugeCircle, borderColor: color }}>
        <span style={{ ...styles.gaugeValue, color }}>{value}</span>
        <span style={styles.gaugeUnit}>%</span>
      </div>
      <p style={styles.gaugeLabel}>{label}</p>
    </div>
  );
};

const CriticalityRow = ({ style, complexity, score, labor, machinery }) => {
  const color = score >= 70 ? '#ef4444' : score >= 50 ? '#f59e0b' : '#22c55e';
  
  return (
    <tr style={styles.tableRow}>
      <td style={styles.tableCell}>
        <span style={styles.styleName}>{style}</span>
      </td>
      <td style={styles.tableCell}>
        <span style={{ ...styles.complexityBadge, backgroundColor: complexity === 'High' ? '#ef444420' : complexity === 'Medium' ? '#f59e0b20' : '#22c55e20', color: complexity === 'High' ? '#ef4444' : complexity === 'Medium' ? '#f59e0b' : '#22c55e' }}>
          {complexity}
        </span>
      </td>
      <td style={styles.tableCell}>
        <div style={styles.scoreBar}>
          <div style={{ ...styles.scoreFill, width: `${score}%`, backgroundColor: color }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color }}>{score}%</span>
        </div>
      </td>
      <td style={styles.tableCell}>
        <span style={styles.factor}>{labor}</span>
      </td>
      <td style={styles.tableCell}>
        <span style={styles.factor}>{machinery}</span>
      </td>
    </tr>
  );
};

const Criticality = () => {
  const styles = [
    { style: 'Dress Shirt - Long Sleeve', complexity: 'High', score: 78, labor: 'Skilled', machinery: 'Specialized' },
    { style: 'Casual Shirt - Short Sleeve', complexity: 'Medium', score: 52, labor: 'Semi-Skilled', machinery: 'Standard' },
    { style: 'Basic T-Shirt', complexity: 'Low', score: 28, labor: 'General', machinery: 'Standard' },
    { style: 'Blazer - Structured', complexity: 'High', score: 85, labor: 'Expert', machinery: 'Specialized' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={stylesHeader.pageHeader}>
        <div>
          <h1 style={stylesHeader.pageTitle}>CRITICALITY MATRIX</h1>
          <p style={stylesHeader.pageSubtitle}>Production complexity and resource allocation analysis</p>
        </div>
      </div>

      {/* Overview Panel */}
      <div style={stylesHeader.overviewPanel}>
        <ScoreGauge value={72} label="Overall Criticality" />
        <div style={stylesHeader.divider} />
        <div style={stylesHeader.metricsRow}>
          <div style={stylesHeader.metricBox}>
            <Factory size={20} color="#b87333" />
            <div>
              <p style={stylesHeader.metricValue}>4.2 hrs</p>
              <p style={stylesHeader.metricLabel}>Avg. Cycle Time</p>
            </div>
          </div>
          <div style={stylesHeader.metricBox}>
            <Wrench size={20} color="#b87333" />
            <div>
              <p style={stylesHeader.metricValue}>68%</p>
              <p style={stylesHeader.metricLabel}>Machine Utilization</p>
            </div>
          </div>
          <div style={stylesHeader.metricBox}>
            <Activity size={20} color="#b87333" />
            <div>
              <p style={stylesHeader.metricValue}>Advanced</p>
              <p style={stylesHeader.metricLabel}>Skill Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={stylesHeader.tableContainer}>
        <div style={stylesHeader.tableHeader}>
          <h2 style={stylesHeader.tableTitle}>STYLE CRITICALITY RATINGS</h2>
        </div>
        <table style={stylesHeader.table}>
          <thead>
            <tr style={stylesHeader.tableHeadRow}>
              <th style={stylesHeader.tableHeadCell}>Garment Style</th>
              <th style={stylesHeader.tableHeadCell}>Complexity</th>
              <th style={stylesHeader.tableHeadCell}>Criticality Score</th>
              <th style={stylesHeader.tableHeadCell}>Labor Grade</th>
              <th style={stylesHeader.tableHeadCell}>Equipment</th>
            </tr>
          </thead>
          <tbody>
            {styles.map((s, i) => (
              <CriticalityRow key={i} {...s} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const stylesHeader = {
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
  overviewPanel: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    padding: '32px',
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  divider: {
    width: '1px',
    height: '80px',
    backgroundColor: '#1e3354',
  },
  metricsRow: {
    display: 'flex',
    gap: '40px',
    flex: 1,
    flexWrap: 'wrap',
  },
  metricBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  metricValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '2px',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#7a8ba3',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  tableContainer: {
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #1e3354',
  },
  tableTitle: {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '1px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeadRow: {
    backgroundColor: '#162642',
  },
  tableHeadCell: {
    padding: '14px 24px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 600,
    color: '#5a6b82',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};

const styles = {
  gaugeContainer: {
    textAlign: 'center',
  },
  gaugeCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '6px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  gaugeValue: {
    fontSize: '32px',
    fontWeight: 700,
  },
  gaugeUnit: {
    fontSize: '16px',
    color: '#7a8ba3',
    marginLeft: '2px',
  },
  gaugeLabel: {
    fontSize: '12px',
    color: '#9aa8bc',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  tableRow: {
    borderTop: '1px solid #1e3354',
  },
  tableCell: {
    padding: '16px 24px',
    fontSize: '13px',
  },
  styleName: {
    fontWeight: 500,
    color: '#ffffff',
  },
  complexityBadge: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
  },
  scoreBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '200px',
  },
  scoreFill: {
    height: '6px',
    borderRadius: '3px',
    flex: 1,
  },
  factor: {
    color: '#9aa8bc',
  },
};

export default Criticality;
