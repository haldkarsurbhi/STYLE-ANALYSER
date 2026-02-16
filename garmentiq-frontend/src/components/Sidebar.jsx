import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { 
  FileDigit, 
  AlertOctagon, 
  Activity, 
  FileBarChart,
  LogOut,
  Settings,
  Factory
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/techpack', label: 'Tech Pack Analysis', icon: FileDigit },
    { path: '/risk', label: 'Risk Assessment', icon: AlertOctagon },
    { path: '/criticality', label: 'Criticality Matrix', icon: Activity },
    { path: '/reports', label: 'Production Reports', icon: FileBarChart },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <aside style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <Logo size="medium" />
        <div style={styles.factoryBadge}>
          <Factory size={12} color="#b87333" />
          <span>UNIT-04</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navLabel}>OPERATIONS</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navItem,
                backgroundColor: isActive ? 'rgba(184, 115, 51, 0.15)' : 'transparent',
                borderLeftColor: isActive ? '#b87333' : 'transparent',
                color: isActive ? '#e5a86c' : '#7a8ba3',
              })}
            >
              <Icon size={18} strokeWidth={2} />
              <span style={styles.navText}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* System Section */}
      <div style={styles.systemSection}>
        <div style={styles.navLabel}>SYSTEM</div>
        <button style={styles.systemBtn}>
          <Settings size={18} strokeWidth={2} />
          <span style={styles.navText}>Configuration</span>
        </button>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={18} strokeWidth={2} />
          <span style={styles.navText}>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.version}>v2.1.4</div>
        <div style={styles.status}>
          <span style={styles.statusDot}></span>
          SYSTEM ONLINE
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '280px',
    height: '100vh',
    backgroundColor: '#0f1d32',
    borderRight: '1px solid #1e3354',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  header: {
    padding: '0 20px 20px',
    borderBottom: '1px solid #1e3354',
    marginBottom: '20px',
  },
  factoryBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    padding: '6px 12px',
    backgroundColor: 'rgba(184, 115, 51, 0.1)',
    border: '1px solid #b87333',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#b87333',
    letterSpacing: '1px',
  },
  nav: {
    flex: 1,
    padding: '0 12px',
  },
  navLabel: {
    padding: '0 16px',
    marginBottom: '12px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#5a6b82',
    letterSpacing: '2px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    borderLeft: '3px solid transparent',
    borderRadius: '0 4px 4px 0',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'all 200ms ease',
    marginBottom: '4px',
  },
  navText: {
    fontFamily: 'Inter, sans-serif',
  },
  systemSection: {
    padding: '0 12px',
    borderTop: '1px solid #1e3354',
    marginTop: '20px',
    paddingTop: '20px',
  },
  systemBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#7a8ba3',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%',
    marginBottom: '4px',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#7a8ba3',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%',
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #1e3354',
    marginTop: 'auto',
  },
  version: {
    fontSize: '11px',
    color: '#5a6b82',
    marginBottom: '8px',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#22c55e',
    letterSpacing: '1px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#22c55e',
    borderRadius: '50%',
    boxShadow: '0 0 8px #22c55e',
  },
};

export default Sidebar;
