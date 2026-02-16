import { BarChart3, Clock, TrendingUp, Layers, Scissors, Gauge } from 'lucide-react';

const ComplexityBar = ({ label, value, maxValue = 100, color = '#8B1E2D' }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div style={styles.barContainer}>
      <div style={styles.barHeader}>
        <span style={styles.barLabel}>{label}</span>
        <span style={styles.barValue}>{value}%</span>
      </div>
      <div style={styles.barTrack}>
        <div style={{
          ...styles.barFill,
          width: `${percentage}%`,
          backgroundColor: color,
        }} />
      </div>
    </div>
  );
};

const Complexity = () => {
  const complexityData = {
    overall: 72,
    smv: 18.5,
    operations: 42,
    contributors: [
      { factor: 'Collar Construction', impact: 85, category: 'high' },
      { factor: 'Button & Buttonhole', impact: 70, category: 'high' },
      { factor: 'Pocket Setting', impact: 60, category: 'medium' },
      { factor: 'Yoke Assembly', impact: 45, category: 'medium' },
      { factor: 'Cuff Attachment', impact: 40, category: 'medium' },
      { factor: 'Placket Construction', impact: 35, category: 'low' },
      { factor: 'Hemming', impact: 20, category: 'low' },
    ],
    timeEstimate: {
      cutting: 45,
      sewing: 285,
      finishing: 35,
      total: 365,
    },
  };

  const getComplexityLabel = (score) => {
    if (score >= 80) return { label: 'Very High', color: '#8B1E2D' };
    if (score >= 60) return { label: 'High', color: '#C4841A' };
    if (score >= 40) return { label: 'Medium', color: '#2D6B1E' };
    return { label: 'Low', color: '#5A5A5A' };
  };

  const complexityInfo = getComplexityLabel(complexityData.overall);

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Complexity</h1>
        <p style={styles.pageSubtitle}>
          Style complexity analysis for production planning and IE team
        </p>
      </div>

      {/* Score Card */}
      <div style={styles.scoreCard}>
        <div style={styles.scoreMain}>
          <div style={styles.scoreHeader}>
            <BarChart3 size={24} color="#8B1E2D" />
            <h2 style={styles.scoreTitle}>Complexity Score</h2>
          </div>
          <div style={styles.scoreDisplay}>
            <span style={styles.scoreNumber}>{complexityData.overall}</span>
            <div style={styles.scoreMeta}>
              <span style={{...styles.complexityLabel, color: complexityInfo.color}}>
                {complexityInfo.label} Complexity
              </span>
              <span style={styles.scoreSubtitle}>Based on 7 key factors</span>
            </div>
          </div>
        </div>
        
        <div style={styles.scoreStats}>
          <div style={styles.statItem}>
            <Clock size={18} color="#6B6B6B" />
            <div style={styles.statContent}>
              <span style={styles.statValue}>{complexityData.smv}</span>
              <span style={styles.statLabel}>Standard Minutes</span>
            </div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <Layers size={18} color="#6B6B6B" />
            <div style={styles.statContent}>
              <span style={styles.statValue}>{complexityData.operations}</span>
              <span style={styles.statLabel}>Operations</span>
            </div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <TrendingUp size={18} color="#6B6B6B" />
            <div style={styles.statContent}>
              <span style={styles.statValue}>{complexityData.timeEstimate.total}</span>
              <span style={styles.statLabel}>Total Minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contributors */}
      <div style={styles.contributorsCard}>
        <div style={styles.cardHeader}>
          <Gauge size={20} color="#8B1E2D" />
          <h2 style={styles.cardTitle}>Complexity Contributors</h2>
        </div>
        <div style={styles.barsContainer}>
          {complexityData.contributors.map((item, index) => (
            <ComplexityBar
              key={index}
              label={item.factor}
              value={item.impact}
              color={item.category === 'high' ? '#8B1E2D' : item.category === 'medium' ? '#C4841A' : '#5A5A5A'}
            />
          ))}
        </div>
      </div>

      {/* Time Breakdown */}
      <div style={styles.timeCard}>
        <div style={styles.cardHeader}>
          <Scissors size={20} color="#8B1E2D" />
          <h2 style={styles.cardTitle}>Time Estimate Breakdown</h2>
        </div>
        <div style={styles.timeGrid}>
          <div style={styles.timeItem}>
            <span style={styles.timeLabel}>Cutting</span>
            <div style={styles.timeBar}>
              <div style={{...styles.timeFill, width: '12%', backgroundColor: '#5A5A5A'}} />
            </div>
            <span style={styles.timeValue}>{complexityData.timeEstimate.cutting} min</span>
          </div>
          <div style={styles.timeItem}>
            <span style={styles.timeLabel}>Sewing</span>
            <div style={styles.timeBar}>
              <div style={{...styles.timeFill, width: '78%', backgroundColor: '#8B1E2D'}} />
            </div>
            <span style={styles.timeValue}>{complexityData.timeEstimate.sewing} min</span>
          </div>
          <div style={styles.timeItem}>
            <span style={styles.timeLabel}>Finishing</span>
            <div style={styles.timeBar}>
              <div style={{...styles.timeFill, width: '10%', backgroundColor: '#C4841A'}} />
            </div>
            <span style={styles.timeValue}>{complexityData.timeEstimate.finishing} min</span>
          </div>
        </div>
        <div style={styles.timeTotal}>
          <span style={styles.timeTotalLabel}>Total Cycle Time</span>
          <span style={styles.timeTotalValue}>{complexityData.timeEstimate.total} minutes</span>
        </div>
      </div>

      {/* IE Notes */}
      <div style={styles.notesCard}>
        <h3 style={styles.notesTitle}>IE Team Recommendations</h3>
        <ul style={styles.notesList}>
          <li style={styles.noteItem}>
            <span style={styles.noteBullet}>•</span>
            Consider using collar butterfly jig for consistent collar attachment
          </li>
          <li style={styles.noteItem}>
            <span style={styles.noteBullet}>•</span>
            Buttonhole machine requires skilled operator - allocate accordingly
          </li>
          <li style={styles.noteItem}>
            <span style={styles.noteBullet}>•</span>
            SMV of 18.5 indicates medium-high complexity - target 85% efficiency for first week
          </li>
          <li style={styles.noteItem}>
            <span style={styles.noteBullet}>•</span>
            Pocket setting with pattern matching adds 2-3 minutes - factor in line balancing
          </li>
        </ul>
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
  scoreCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    marginBottom: '24px',
  },
  scoreMain: {
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: '1px solid #F0F0F0',
  },
  scoreHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  scoreTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#2B2B2B',
    letterSpacing: '0.02em',
  },
  scoreDisplay: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
  },
  scoreNumber: {
    fontSize: '72px',
    fontWeight: 800,
    color: '#2B2B2B',
    lineHeight: 1,
    letterSpacing: '-0.03em',
  },
  scoreMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingBottom: '8px',
  },
  complexityLabel: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
  scoreSubtitle: {
    fontSize: '13px',
    color: '#9B9B9B',
  },
  scoreStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statContent: {
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
    fontSize: '12px',
    color: '#9B9B9B',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#E5E5E5',
  },
  contributorsCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    marginBottom: '24px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#2B2B2B',
    letterSpacing: '0.02em',
  },
  barsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  barHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4A4A4A',
  },
  barValue: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#6B6B6B',
  },
  barTrack: {
    width: '100%',
    height: '8px',
    backgroundColor: '#F0F0F0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 500ms ease',
  },
  timeCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    marginBottom: '24px',
  },
  timeGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
  },
  timeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  timeLabel: {
    width: '80px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#4A4A4A',
  },
  timeBar: {
    flex: 1,
    height: '12px',
    backgroundColor: '#F0F0F0',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  timeFill: {
    height: '100%',
    borderRadius: '6px',
    transition: 'width 500ms ease',
  },
  timeValue: {
    width: '70px',
    textAlign: 'right',
    fontSize: '14px',
    fontWeight: 600,
    color: '#6B6B6B',
  },
  timeTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #F0F0F0',
  },
  timeTotalLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4A4A4A',
  },
  timeTotalValue: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#8B1E2D',
  },
  notesCard: {
    backgroundColor: '#FDF9E8',
    border: '1px solid #F5E6C8',
    borderRadius: '12px',
    padding: '24px',
  },
  notesTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#6B5B3D',
    marginBottom: '16px',
    letterSpacing: '0.02em',
  },
  notesList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  noteItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px',
    color: '#6B5B3D',
    lineHeight: 1.6,
  },
  noteBullet: {
    color: '#C4841A',
    fontWeight: 700,
  },
};

export default Complexity;
