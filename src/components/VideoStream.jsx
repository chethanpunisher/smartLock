import React from 'react';

const VideoStream = () => {
  // Inline CSS for styling
  const styles = {
    videoContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      marginTop: '20px',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '10px',
    },
    videoStream: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '30px',
    },
    streamFrame: {
      width: '640px',
      height: '480px',
      border: '5px solid #4a90e2',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    footer: {
      marginTop: '20px',
      fontSize: '1rem',
      color: '#666',
    },
  };

  return (
    <div style={styles.videoContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>{"Camera 1 ...................................... Camera 2"}</h1>
      </div>
      <div style={styles.videoStream}>
        
        <img
          src="http://192.168.0.108:5000/video_feed1"
          alt="Raspberry Pi Video Stream 1"
          style={styles.streamFrame}
        />
        <img
          src="http://192.168.0.108:5000/video_feed2"
          alt="Raspberry Pi Video Stream 2"
          style={styles.streamFrame}
        />
      </div>
      <div style={styles.footer}>
      </div>
    </div>
  );
};

export default VideoStream;
