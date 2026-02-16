import { NavLink, useLocation } from 'react-router-dom';
import ShirtLogo from './ShirtLogo';
import { 
  FileSearch, 
  AlertCircle, 
  BarChart3, 
  FileText,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/techpack', label: 'Analyse Style', icon: FileSearch },
    { path: '/risk', label: 'Risk Check', icon: AlertCircle },
    { path: '/complexity', label: 'Complexity', icon: BarChart3 },
    { path: '/reports', label: 'Reports', icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <aside style={styles.sidebar}>
      {/* Logo Section */}
      <div style={styles.logoSection}>
        <ShirtLogo size="medium" />
        <div style={styles.brandText}>
          <h1 style={styles.brandName}>STYLE ANALYSER</h1>
          <p style={styles.brandTagline}>Enterprise Edition</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                ...styles.navItem,
                backgroundColor: isActive ? '#FDF2F4' : 'transparent',
                color: isActive ? '#8B1E2D' : '#6B6B6B',
                borderLeft: isActive ? '3px solid #8B1E2D' : '3px solid transparent',
              }}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span style={styles.navLabel}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button onClick={handleLogout} style={styles.logoutBtn}>
        <LogOut size={20} />
        <span style={styles.logoutLabel}>Exit System</span>
      </button>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '280px',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 0',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '0 24px 32px',
    borderBottom: '1px solid #EEEEEE',
    marginBottom: '24px',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  brandName: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#8B1E2D',
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  brandTagline: {
    fontSize: '11px',
    color: '#9B9B9B',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    padding: '0 16px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 600,
    transition: 'all 200ms ease',
  },
  navLabel: {
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 24px',
    margin: '0 24px',
    backgroundColor: 'transparent',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    color: '#6B6B6B',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    marginTop: 'auto',
  },
  logoutLabel: {
    fontSize: '14px',
    fontWeight: 600,
  },
};

export default Sidebar;
