import React, { useState, useRef } from 'react';
import { io } from 'socket.io-client';

const Audio = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);
  const streamRef = useRef(null); // To store the media stream

  const handleStartRecording = async () => {
    try {
      // Establish socket connection to the server only when recording starts
      socketRef.current = io('http://192.168.0.117:8000'); // Replace with your server URL

      // Request access to the microphone if not already granted
      if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      mediaRecorderRef.current = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Stream each audio chunk to the server in real-time
          socketRef.current.emit('audio-stream', event.data);
        }
      };

      // Start recording in real-time
      mediaRecorderRef.current.start(250); // 250ms interval between chunks
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();  // Stop the recording
      mediaRecorderRef.current = null;
      setRecording(false);

      // Notify the server that the audio stream has ended
      socketRef.current.emit('audio-end');

      // Disconnect from the socket server
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null; // Clear the reference
      }
    }

    // Properly stop and release the media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;  // Reset stream for next recording
    }
  };

  return (
    <div>
      <h2>Real-Time Voice Streaming</h2>
      <button onClick={recording ? handleStopRecording : handleStartRecording}>
        {recording ? 'Stop Streaming' : 'Start Streaming'}
      </button>
    </div>
  );
};

export default Audio;
