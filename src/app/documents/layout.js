import Sidebar from '../../components/Sidebar';

export default function DocumentsLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
