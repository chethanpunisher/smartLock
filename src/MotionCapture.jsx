import React, { useEffect, useState } from 'react';
import './MotionCapture.css';

const MotionCapture = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://motioncontrol-doorlocksmart.pagekite.me/videos') // Adjust to your server address
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="motion-capture">
      <h2>Saved Videos</h2>
      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div className="video-grid">
          {videos.map((video, index) => (
            <div className="video-container" key={index}>
              <h3>{video}</h3>
              <video controls width="100%">
                <source src={`https://motioncontrol-doorlocksmart.pagekite.me/videos/${video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MotionCapture;
