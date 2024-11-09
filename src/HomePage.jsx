import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import GoLive from './GoLive';
import MotionCapture from './MotionCapture';
import Audio from './Audio';
import DoorControl from './DoorControl';
import './App.css'; // Assume custom styling for drawer-like behavior

// GoLive Screen Component
function GoLiveScreen() {
  return (
    <div className="content">
      <GoLive />
    </div>
  );
}

// DoorLockControl Screen Component
function DoorLockControlScreen() {
  return (
    <div className="content">
      <DoorControl />
    </div>
  );
}

// MotionCapture Screen Component
function MotionCaptureScreen() {
  return (
    <div className="content">
      <MotionCapture />
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

// App Component with Navigation Drawer
export default function App() {
  return (
    <Router>
      <div className="drawer">
        <nav className="drawer-nav">
          <Link to="/go-live">Go Live</Link>
          <Link to="/motion-capture">Motion Capture</Link>
          <Link to="/audio-stream">Audio Stream</Link>
          <Link to="/door-lock-control">Door Lock Control</Link>
        </nav>
        <div className="drawer-content">
          <Switch>
            <Route path="/go-live" component={GoLiveScreen} />
            <Route path="/motion-capture" component={MotionCaptureScreen} />
            <Route path="/audio-stream" component={AudioStreamScreen} />
            <Route path="/door-lock-control" component={DoorLockControlScreen} />
            <Route path="/" exact component={GoLiveScreen} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
