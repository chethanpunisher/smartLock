import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import necessary components
import './App.css';
import MotionCapture from './MotionCapture';
import GoLive from './GoLive';
import Audio from './Audio';
import DoorControl from './DoorControl';
// import HomePage from './HomePage';

function GoLiveScreen() {
  return (
    <div className="content">
      <GoLive />
    </div>
  );
}

// AudioStream Screen Component
function AudioStreamScreen() {
  return (
    <div className="content">
      <Audio />
    </div>
  );
}

// MotionCapture Screen Component
function MotionCaptureScreen() {
  return (
    <div className="content">
      <MotionCapture/>
    </div>
  );
}

function DoorControlScreen(){
  return (
    <div className="content">
      <DoorControl/>
    </div>
  );
}

const App = () => {
  const [selectedOption, setSelectedOption] = useState('motion');


  return (
    <Router>
      <div className="drawer">
        <nav className="drawer-nav">
          <Link to="/go-live">Go Live</Link>
          <Link to="motion-capture">Motion Capture</Link>
          <Link to="/audio-stream">Audio Stream</Link>
          <Link to="/door-control">Door Control</Link>
        </nav>
        <div className="drawer-content">
          <Routes>
            <Route path="/go-live" element={<GoLiveScreen />} />
            <Route path="/motion-capture" element={<MotionCaptureScreen/>}/>
            <Route path="/audio-stream" element={< AudioStreamScreen />} />
            <Route path="/door-control" element={<DoorControlScreen/>} />
            <Route path="/" element={<GoLiveScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
