import React, { useState, useEffect } from 'react';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          marginRight: '5px',
          backgroundColor: isOnline ? 'green' : 'red',
        }}
      />
      {isOnline ? (
        <p className=' text-white'>online</p>
      ) : (
        <p>offline</p>
      )}
    </div>
  );
}

export default OnlineStatus;
