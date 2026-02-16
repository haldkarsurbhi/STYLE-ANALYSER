// Industrial Logo Component for GarmentIQ
const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: { width: 32, height: 32, fontSize: '18px' },
    medium: { width: 48, height: 48, fontSize: '24px' },
    large: { width: 64, height: 64, fontSize: '32px' },
  };

  const s = sizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Industrial Gear Icon */}
      <svg
        width={s.width}
        height={s.height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer gear ring */}
        <path
          d="M24 4L26.5 8.5L31.5 7L34 12L39 13L39 18L44 20.5L42 25.5L46 29L42 32.5L44 37.5L39 39L38 44L32.5 43.5L29 47L24 44L19 47L15.5 43.5L10 44L9 39L4 37.5L6 32.5L2 29L6 25.5L4 20.5L9 18L9 13L14 12L16.5 7L21.5 8.5L24 4Z"
          stroke="#b87333"
          strokeWidth="2"
          fill="none"
        />
        {/* Inner circle - machine spindle */}
        <circle cx="24" cy="24" r="10" fill="#b87333" opacity="0.3" />
        <circle cx="24" cy="24" r="6" fill="#b87333" />
        {/* Thread/needle indicator */}
        <line x1="24" y1="14" x2="24" y2="6" stroke="#fff" strokeWidth="2" />
        {/* Measurement marks */}
        <line x1="24" y1="34" x2="24" y2="42" stroke="#b87333" strokeWidth="1" />
        <line x1="14" y1="24" x2="6" y2="24" stroke="#b87333" strokeWidth="1" />
        <line x1="42" y1="24" x2="34" y2="24" stroke="#b87333" strokeWidth="1" />
      </svg>
      
      {/* Brand Text */}
      <div>
        <span
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: s.fontSize,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '1px',
          }}
        >
          GARMENT
        </span>
        <span
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: s.fontSize,
            fontWeight: 700,
            color: '#b87333',
            letterSpacing: '1px',
          }}
        >
          IQ
        </span>
      </div>
    </div>
  );
};

export default Logo;
