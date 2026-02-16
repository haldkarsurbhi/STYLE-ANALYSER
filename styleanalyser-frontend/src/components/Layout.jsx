import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F7F7F7',
  },
  main: {
    flex: 1,
    marginLeft: '280px',
    minHeight: '100vh',
    padding: '40px 48px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

export default Layout;
