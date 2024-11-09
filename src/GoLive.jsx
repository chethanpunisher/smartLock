import React from 'react';
//import './GoLive.css';

const GoLive = () => (
  <div className="live-stream">
    <h2>Live Streams</h2>
    <div className="streams">
      <div className="stream">
        <h3>Camera 1</h3>
          <img
            src="http://192.168.0.117:5000/video_feed1"
            alt="Raspberry Pi Video Stream 1"
          />
      </div>
      <div className="stream">
        <h3>Camera 2</h3>
          <img
            src="http://192.168.0.117:5000/video_feed2"
            alt="Raspberry Pi Video Stream 2"
          />
      </div>
    </div>
  </div>
);

export default GoLive;
