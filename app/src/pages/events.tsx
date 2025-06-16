import React, { useEffect, useRef } from 'react';

export function Events() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.style.height = `${window.innerHeight - 100}px`;
    }

    const handleResize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
