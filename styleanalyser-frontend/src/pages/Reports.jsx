import { FileText, FileSpreadsheet, Download, Calendar, HardDrive } from 'lucide-react';

const ReportCard = ({ title, type, date, size, icon: Icon }) => {
  const typeColors = {
    PDF: { bg: '#FDF2F4', color: '#8B1E2D' },
    Excel: { bg: '#E8F5E9', color: '#2D6B1E' },
  };
  
  const typeConfig = typeColors[type] || typeColors.PDF;

  return (
    <div style={styles.reportCard}>
      <div style={styles.reportLeft}>
        <div style={{...styles.iconBox, backgroundColor: typeConfig.bg}}>
          <Icon size={24} color={typeConfig.color} />
        </div>
        <div style={styles.reportInfo}>
          <h3 style={styles.reportTitle}>{title}</h3>
          <div style={styles.reportMeta}>
            <span style={{...styles.typeBadge, color: typeConfig.color}}>{type}</span>
            <span style={styles.metaDot}>•</span>
            <span style={styles.metaText}>{date}</span>
            <span style={styles.metaDot}>•</span>
            <span style={styles.metaText}>{size}</span>
          </div>
        </div>
      </div>
      <button style={styles.downloadBtn}>
        <Download size={18} />
        Download
      </button>
    </div>
  );
};

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: 'Tech Pack Analysis Report',
      type: 'PDF',
      date: 'Feb 3, 2026',
      size: '2.4 MB',
      icon: FileText,
    },
    {
      id: 2,
      title: 'Risk Assessment Summary',
      type: 'PDF',
      date: 'Feb 3, 2026',
      size: '1.1 MB',
      icon: FileText,
    },
    {
      id: 3,
      title: 'Complexity Analysis - Style #2847',
      type: 'Excel',
      date: 'Feb 2, 2026',
      size: '856 KB',
      icon: FileSpreadsheet,
    },
    {
      id: 4,
      title: "Operation Breakdown - Men's Shirt",
      type: 'Excel',
      date: 'Feb 1, 2026',
      size: '1.2 MB',
      icon: FileSpreadsheet,
    },
    {
      id: 5,
      title: 'Pre-Production Checklist',
      type: 'PDF',
      date: 'Jan 30, 2026',
      size: '680 KB',
      icon: FileText,
    },
    {
      id: 6,
      title: 'Monthly Risk Report - January',
      type: 'PDF',
      date: 'Jan 28, 2026',
      size: '3.2 MB',
      icon: FileText,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Reports</h1>
        <p style={styles.pageSubtitle}>
          Download generated analysis documents and production reports
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <FileText size={20} color="#8B1E2D" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>24</span>
            <span style={styles.statLabel}>PDF Reports</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <FileSpreadsheet size={20} color="#2D6B1E" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>18</span>
            <span style={styles.statLabel}>Excel Files</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <HardDrive size={20} color="#6B6B6B" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>156 MB</span>
            <span style={styles.statLabel}>Total Storage</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filtersBar}>
        <div style={styles.filterGroup}>
          <button style={{...styles.filterBtn, ...styles.filterBtnActive}}>All Reports</button>
          <button style={styles.filterBtn}>PDF</button>
          <button style={styles.filterBtn}>Excel</button>
        </div>
        <div style={styles.filterGroup}>
          <button style={styles.filterBtn}>
            <Calendar size={16} />
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div style={styles.reportsList}>
        {reports.map((report) => (
          <ReportCard key={report.id} {...report} />
        ))}
      </div>

      {/* Empty State Hint */}
      <div style={styles.emptyHint}>
        <p style={styles.emptyHintText}>
          Reports are automatically generated when you analyse a tech pack. 
          New reports appear at the top of the list.
        </p>
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#2B2B2B',
  },
  statLabel: {
    fontSize: '13px',
    color: '#9B9B9B',
  },
  filtersBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filterGroup: {
    display: 'flex',
    gap: '8px',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    color: '#6B6B6B',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  filterBtnActive: {
    backgroundColor: '#FDF2F4',
    borderColor: '#8B1E2D',
    color: '#8B1E2D',
  },
  reportsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  reportCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    transition: 'all 200ms ease',
  },
  reportLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
  },
  reportInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  reportTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#2B2B2B',
    letterSpacing: '0.01em',
  },
  reportMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  typeBadge: {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.05em',
  },
  metaDot: {
    color: '#C5C5C5',
    fontSize: '10px',
  },
  metaText: {
    fontSize: '13px',
    color: '#9B9B9B',
  },
  downloadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #8B1E2D',
    borderRadius: '8px',
    color: '#8B1E2D',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  emptyHint: {
    marginTop: '24px',
    padding: '20px 24px',
    backgroundColor: '#FAFAFA',
    borderRadius: '10px',
    textAlign: 'center',
  },
  emptyHintText: {
    fontSize: '13px',
    color: '#9B9B9B',
  },
};

export default Reports;
