import React, { useEffect, useRef } from 'react';

export function Events() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 64;
      const bottomNavHeight = 61;
      const isMobile = window.innerWidth < 768;

      const totalOffset = isMobile ? headerHeight + bottomNavHeight : 0;

      if (iframeRef.current) {
        iframeRef.current.style.height = `${window.innerHeight - totalOffset}px`;
      }
    };

    updateHeight(); // initial

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://www.billetweb.fr/multi_event.php?multi=42066&color=f28a38"
      width="100%"
      style={{ border: 'none' }}
      title="Billetweb Events"
    />
  );
}
