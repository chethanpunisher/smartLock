import React, { useState } from 'react';
import './GoLive.css';

const GoLive = () => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const handleImageLoad1 = () => setLoading1(false);
  const handleImageLoad2 = () => setLoading2(false);

  return (
    <div className="live-stream">
      <h2>Live Streams</h2>
      <div className="streams">
        <div className="stream">
          <h3>Camera 1</h3>
          {loading1 && <p>Loading Camera 1...</p>}
          <img
            src="https://audiocontrol-doorlocksmart.pagekite.me/video_feed1"
            alt="Raspberry Pi Video Stream 1"
            onLoad={handleImageLoad1}
            style={{ display: loading1 ? 'none' : 'block' }}
          />
        </div>
        <div className="stream">
          <h3>Camera 2</h3>
          {loading2 && <p>Loading Camera 2...</p>}
          <img
            src="https://audiocontrol-doorlocksmart.pagekite.me/video_feed2"
            alt="Raspberry Pi Video Stream 2"
            onLoad={handleImageLoad2}
            style={{ display: loading2 ? 'none' : 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default GoLive;
