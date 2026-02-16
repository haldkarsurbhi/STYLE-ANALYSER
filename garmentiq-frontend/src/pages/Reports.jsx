import { Download, FileText, Calendar, Filter } from 'lucide-react';

const ReportRow = ({ title, type, date, size, status }) => (
  <div style={styles.reportRow}>
    <div style={styles.reportIcon}>
      <FileText size={24} color="#b87333" />
    </div>
    <div style={styles.reportInfo}>
      <h3 style={styles.reportTitle}>{title}</h3>
      <div style={styles.reportMeta}>
        <span style={styles.reportType}>{type}</span>
        <span style={styles.metaDot}>•</span>
        <span style={styles.metaText}>{date}</span>
        <span style={styles.metaDot}>•</span>
        <span style={styles.metaText}>{size}</span>
      </div>
    </div>
    <div style={styles.reportActions}>
      <span style={{ ...styles.statusBadge, backgroundColor: status === 'Ready' ? '#22c55e20' : '#f59e0b20', color: status === 'Ready' ? '#22c55e' : '#f59e0b' }}>
        {status}
      </span>
      <button style={styles.downloadBtn}>
        <Download size={16} />
        <span>Download</span>
      </button>
    </div>
  </div>
);

const Reports = () => {
  const reports = [
    { title: 'Tech Pack Analysis - Batch #4421', type: 'PDF Report', date: '02 Feb 2026', size: '2.4 MB', status: 'Ready' },
    { title: 'Risk Assessment - Q1 2026', type: 'Excel Analysis', date: '01 Feb 2026', size: '1.8 MB', status: 'Ready' },
    { title: 'Criticality Matrix Summary', type: 'PDF Report', date: '30 Jan 2026', size: '856 KB', status: 'Ready' },
    { title: 'Production Line Efficiency', type: 'CSV Data', date: '28 Jan 2026', size: '4.2 MB', status: 'Processing' },
    { title: 'Quality Control Audit', type: 'PDF Report', date: '25 Jan 2026', size: '3.1 MB', status: 'Ready' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>PRODUCTION REPORTS</h1>
          <p style={styles.pageSubtitle}>Generated analysis and audit documentation</p>
        </div>
      </div>

      {/* Filter Panel */}
      <div style={styles.filterPanel}>
        <div style={styles.filterGroup}>
          <Calendar size={18} color="#7a8ba3" />
          <select style={styles.select}>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <Filter size={18} color="#7a8ba3" />
          <select style={styles.select}>
            <option>All Reports</option>
            <option>Tech Pack</option>
            <option>Risk Assessment</option>
            <option>Quality Audit</option>
          </select>
        </div>
        <button style={styles.generateBtn}>
          Generate New Report
        </button>
      </div>

      {/* Reports List */}
      <div style={styles.reportsList}>
        {reports.map((report, i) => (
          <ReportRow key={i} {...report} />
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <span style={styles.paginationText}>Showing 5 of 24 reports</span>
        <div style={styles.paginationButtons}>
          <button style={styles.paginationBtn}>Previous</button>
          <button style={styles.paginationBtn}>Next</button>
        </div>
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
  filterPanel: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  select: {
    padding: '10px 16px',
    backgroundColor: '#162642',
    border: '1px solid #1e3354',
    borderRadius: '4px',
    color: '#9aa8bc',
    fontSize: '13px',
    minWidth: '150px',
  },
  generateBtn: {
    marginLeft: 'auto',
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
  reportsList: {
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  reportRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    borderBottom: '1px solid #1e3354',
  },
  reportIcon: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(184, 115, 51, 0.1)',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '6px',
  },
  reportMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
  },
  reportType: {
    color: '#b87333',
    fontWeight: 500,
  },
  metaDot: {
    color: '#5a6b82',
  },
  metaText: {
    color: '#7a8ba3',
  },
  reportActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
  },
  downloadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#b87333',
    border: 'none',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '16px 24px',
  },
  paginationText: {
    fontSize: '13px',
    color: '#7a8ba3',
  },
  paginationButtons: {
    display: 'flex',
    gap: '12px',
  },
  paginationBtn: {
    padding: '10px 20px',
    backgroundColor: '#162642',
    border: '1px solid #1e3354',
    borderRadius: '4px',
    color: '#9aa8bc',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default Reports;
