import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const Login = () => {
  const [factoryCode, setFactoryCode] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/techpack');
  };

  return (
    <div style={styles.container}>
      {/* Industrial background pattern */}
      <div style={styles.bgPattern}></div>
      
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <Logo size="large" />
          <p style={styles.subtitle}>PRE-PRODUCTION INTELLIGENCE SYSTEM</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Factory Unit Code</label>
            <input
              type="text"
              value={factoryCode}
              onChange={(e) => setFactoryCode(e.target.value)}
              placeholder="e.g., UNIT-04-Bangalore"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Operator ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter operator identification"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Access Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure access key"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM'}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.securityNote}>
            <span style={styles.lockIcon}>🔒</span>
            <span>Secure Industrial Network</span>
          </div>
          <p style={styles.copyright}>© 2026 GarmentIQ Systems. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a1628',
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(184, 115, 51, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184, 115, 51, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#0f1d32',
    border: '1px solid #1e3354',
    borderRadius: '8px',
    padding: '48px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '24px',
    borderBottom: '1px solid #1e3354',
  },
  subtitle: {
    marginTop: '16px',
    fontSize: '12px',
    color: '#7a8ba3',
    letterSpacing: '3px',
    fontWeight: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#9aa8bc',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  input: {
    padding: '16px',
    backgroundColor: '#162642',
    border: '1px solid #1e3354',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 200ms ease',
  },
  button: {
    marginTop: '8px',
    padding: '18px',
    background: 'linear-gradient(135deg, #b87333, #8a5a28)',
    border: 'none',
    borderRadius: '4px',
    color: '#ffffff',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '2px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 4px 12px rgba(184, 115, 51, 0.3)',
  },
  footer: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #1e3354',
    textAlign: 'center',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#5a6b82',
    marginBottom: '12px',
  },
  lockIcon: {
    fontSize: '14px',
  },
  copyright: {
    fontSize: '11px',
    color: '#5a6b82',
  },
};

export default Login;
