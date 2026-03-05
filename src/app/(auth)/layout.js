export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout" style={{ 
      backgroundImage: 'url(/bg-auth.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Dark overlay to make the glassmorphism pop */}
      <div style={{
         position: 'absolute',
         top: 0, left: 0, right: 0, bottom: 0,
         backgroundColor: 'rgba(3, 51, 81, 0.4)',
         zIndex: 0
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
