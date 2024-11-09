import React, { useEffect, useState } from 'react';
//import './MotionCapture.css';

const MotionCapture = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch videos for motion capture option
    fetch('http://192.168.0.117:3000/videos') // Adjust to your server address
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="motion-capture">
      <h2>Saved Videos</h2>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        videos.map((video, index) => (
          <div className="video-container" key={index}>
            <h3>{video}</h3>
            <video controls width="640" height="480">
              <source src={`http://192.168.0.117:3000/videos/${video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      )}
    </div>
  );
};

export default MotionCapture;
