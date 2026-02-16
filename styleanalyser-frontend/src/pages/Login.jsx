import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factory, User, Lock, ArrowRight } from 'lucide-react';
import ShirtLogo from '../components/ShirtLogo';

const Login = () => {
  const [factoryCode, setFactoryCode] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/techpack');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <ShirtLogo size="large" />
          <div style={styles.brandText}>
            <h1 style={styles.brandName}>STYLE ANALYSER</h1>
            <p style={styles.tagline}>Apparel Specification & Risk Intelligence System</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Factory size={16} style={styles.labelIcon} />
              Factory Code
            </label>
            <input
              type="text"
              value={factoryCode}
              onChange={(e) => setFactoryCode(e.target.value)}
              placeholder="Enter factory identifier"
              required
              style={styles.input}
            />
            <span style={styles.hint}>e.g. BGL-04-APP</span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <User size={16} style={styles.labelIcon} />
              User ID
            </label>
            <input
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Lock size={16} style={styles.labelIcon} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Access System
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Authorized personnel only. All actions are logged.
          </p>
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
    backgroundColor: '#F7F7F7',
    padding: '24px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '16px',
    padding: '48px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
    textAlign: 'center',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  brandName: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#8B1E2D',
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  tagline: {
    fontSize: '14px',
    color: '#6B6B6B',
    letterSpacing: '0.01em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#4A4A4A',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  labelIcon: {
    color: '#8B1E2D',
  },
  input: {
    padding: '14px 18px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D5D5D5',
    borderRadius: '10px',
    color: '#2B2B2B',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 200ms ease',
  },
  hint: {
    fontSize: '13px',
    color: '#9B9B9B',
    marginTop: '4px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '8px',
    padding: '16px 24px',
    backgroundColor: '#8B1E2D',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  footer: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #EEEEEE',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '12px',
    color: '#9B9B9B',
    letterSpacing: '0.02em',
  },
};

export default Login;
