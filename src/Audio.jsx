import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import './Audio.css';

const Audio = () => {
  const [recording, setRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const handleStartRecording = async () => {
    try {
      // Establish socket connection to the server only when recording starts
      socketRef.current = io('https://doorcontrol-doorlocksmart.pagekite.me/'); // Replace with your server URL

      // Request access to the microphone if not already granted
      if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      mediaRecorderRef.current = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socketRef.current.emit('audio-stream', event.data);
        }
      };

      mediaRecorderRef.current.start(250); // 250ms interval between chunks
      setRecording(true);

      // Start the timer
      setTimeElapsed(0);
      timerRef.current = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setRecording(false);

      // Notify the server that the audio stream has ended
      socketRef.current.emit('audio-end');

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }

    // Stop and release the media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Stop the timer
    clearInterval(timerRef.current);
    setTimeElapsed(0);
  };

  useEffect(() => {
    return () => {
      // Clean up on component unmount
      if (socketRef.current) socketRef.current.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="audio-container">
      <h2>Real-Time Voice Streaming</h2>
      <div className="status-container">
        <span className={`status-indicator ${recording ? 'recording' : ''}`}></span>
        {recording ? `Streaming on... ${timeElapsed}s` : 'Streaming Stopped'}
      </div>
      <button
        className={`record-button ${recording ? 'stop' : 'start'}`}
        onClick={recording ? handleStopRecording : handleStartRecording}
      >
        {recording ? 'Stop Streaming' : 'Start Streaming'}
      </button>
    </div>
  );
};

export default Audio;
