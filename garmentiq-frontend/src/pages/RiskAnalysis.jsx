import { AlertOctagon, AlertTriangle, Info, TrendingUp, Users, Clock } from 'lucide-react';

const RiskMetric = ({ icon: Icon, label, value, trend, color }) => (
  <div style={styles.metricCard}>
    <div style={{ ...styles.metricIcon, backgroundColor: `${color}20` }}>
      <Icon size={24} color={color} />
    </div>
    <div>
      <p style={styles.metricLabel}>{label}</p>
      <div style={styles.metricValue}>
        <span style={{ fontSize: '28px', fontWeight: 700, color: color }}>{value}</span>
        {trend && <span style={{ ...styles.trend, color: trend > 0 ? '#22c55e' : '#ef4444' }}>{trend > 0 ? '+' : ''}{trend}%</span>}
      </div>
    </div>
  </div>
);

const RiskRow = ({ operation, type, severity, probability, status }) => {
  const severityColors = {
    Critical: '#ef4444',
    High: '#f59e0b',
    Medium: '#3b82f6',
    Low: '#22c55e',
  };

  return (
    <tr style={styles.tableRow}>
      <td style={styles.tableCell}>
        <span style={styles.operation}>{operation}</span>
      </td>
      <td style={styles.tableCell}>
        <span style={styles.type}>{type}</span>
      </td>
      <td style={styles.tableCell}>
        <span style={{ ...styles.severityBadge, backgroundColor: `${severityColors[severity]}20`, color: severityColors[severity] }}>
          {severity}
        </span>
      </td>
      <td style={styles.tableCell}>
        <div style={styles.probabilityBar}>
          <div style={{ ...styles.probabilityFill, width: `${probability}%`, backgroundColor: severityColors[severity] }} />
          <span>{probability}%</span>
        </div>
      </td>
      <td style={styles.tableCell}>
        <span style={{ ...styles.statusBadge, backgroundColor: status === 'Active' ? '#22c55e20' : '#5a6b8220', color: status === 'Active' ? '#22c55e' : '#5a6b82' }}>
          {status}
        </span>
      </td>
    </tr>
  );
};

const RiskAnalysis = () => {
  const risks = [
    { operation: 'Collar Attachment', type: 'Construction', severity: 'Critical', probability: 85, status: 'Active' },
    { operation: 'Button Stitching', type: 'Quality', severity: 'High', probability: 65, status: 'Active' },
    { operation: 'Pocket Setting', type: 'Alignment', severity: 'High', probability: 58, status: 'Active' },
    { operation: 'Side Seam', type: 'Standard', severity: 'Medium', probability: 32, status: 'Active' },
    { operation: 'Label Attach', type: 'Standard', severity: 'Low', probability: 15, status: 'Closed' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>RISK ASSESSMENT</h1>
          <p style={styles.pageSubtitle}>Production risk analysis and mitigation tracking</p>
        </div>
      </div>

      {/* Metrics */}
      <div style={styles.metricsGrid}>
        <RiskMetric icon={AlertOctagon} label="Critical Risks" value="3" trend={-12} color="#ef4444" />
        <RiskMetric icon={AlertTriangle} label="High Risks" value="5" trend={8} color="#f59e0b" />
        <RiskMetric icon={Users} label="Operators at Risk" value="12" trend={-5} color="#3b82f6" />
        <RiskMetric icon={Clock} label="Avg. Resolution (hrs)" value="4.2" trend={-15} color="#22c55e" />
      </div>

      {/* Risk Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>ACTIVE RISK ITEMS</h2>
          <button style={styles.exportBtn}>EXPORT REPORT</button>
        </div>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.tableHeadCell}>Operation</th>
              <th style={styles.tableHeadCell}>Risk Type</th>
              <th style={styles.tableHeadCell}>Severity</th>
              <th style={styles.tableHeadCell}>Probability</th>
              <th style={styles.tableHeadCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, i) => (
              <RiskRow key={i} {...risk} />
            ))}
          </tbody>
        </table>
      </div>
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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  metricCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
  },
  metricIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#7a8ba3',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  metricValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  trend: {
    fontSize: '12px',
    fontWeight: 600,
  },
  tableContainer: {
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  exportBtn: {
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
  tableRow: {
    borderTop: '1px solid #1e3354',
  },
  tableCell: {
    padding: '16px 24px',
    fontSize: '13px',
  },
  operation: {
    fontWeight: 500,
    color: '#ffffff',
  },
  type: {
    color: '#9aa8bc',
  },
  severityBadge: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
  },
  probabilityBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '150px',
  },
  probabilityFill: {
    height: '4px',
    borderRadius: '2px',
    flex: 1,
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
  },
};

export default RiskAnalysis;
