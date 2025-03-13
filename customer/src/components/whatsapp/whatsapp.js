import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = ({ phoneNumber = "1234567890", message = "", position = "right", animated = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 480);
      setIsTablet(window.innerWidth >= 480 && window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determine size based on screen
  const getIconSize = () => {
    if (isMobile) return { iconSize: 25, containerSize: 45 };
    if (isTablet) return { iconSize: 30, containerSize: 50 };
    return { iconSize: 35, containerSize: 60 }; // desktop default
  };

  const { iconSize, containerSize } = getIconSize();

  // Determine margins based on screen
  const getMargin = () => {
    if (isMobile) return 10;
    if (isTablet) return 15;
    return 20; // desktop default
  };

  // Prepare WhatsApp URL with phone number and optional message
  const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  // Styles for the WhatsApp icon
  const iconStyles = {
    position: 'fixed',
    bottom: `${getMargin()}px`,
    [position]: `${getMargin()}px`,
    backgroundColor: '#25D366',
    color: 'white',
    width: `${containerSize}px`,
    height: `${containerSize}px`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: isHovered 
      ? '0 6px 12px rgba(0, 0, 0, 0.4)' 
      : '0 4px 8px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  };

  // Animation styles
  const getAnimationStyle = () => {
    if (!animated) return {};
    
    return {
      animation: 'pulse 2s infinite',
    };
  };

  return (
    <>
      {/* Add the keyframes for the animation */}
      {animated && (
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}
        </style>
      )}
      
      {/* WhatsApp Icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{...iconStyles, ...getAnimationStyle()}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={iconSize} />
      </a>
    </>
  );
};

export default WhatsAppIcon;