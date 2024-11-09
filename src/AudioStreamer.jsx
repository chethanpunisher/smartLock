import React, { useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

const AudioStreamer = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    // Cleanup mediaRecorder when the component unmounts
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const startStreaming = async () => {
    try {
      // Access the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize WebSocket connection
      const socket = new ReconnectingWebSocket("http://192.168.0.117:5000");

      // Create a MediaRecorder to capture audio
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm", // You can also use other types like "audio/ogg" or "audio/wav"
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socket.readyState === 1) {
          // Send audio data to the server through WebSocket
          socket.send(event.data);
        }
      };

      // Start recording audio and send every 100ms
      recorder.start(100);
      setMediaRecorder(recorder);
      setIsStreaming(true);
    } catch (error) {
      console.error("Error accessing the microphone: ", error);
    }
  };

  const stopStreaming = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsStreaming(false);
    }
  };

  return (
    <div>
      <h2>Audio Streaming</h2>
      {isStreaming ? (
        <button onClick={stopStreaming}>Stop Streaming</button>
      ) : (
        <button onClick={startStreaming}>Start Streaming</button>
      )}
    </div>
  );
};

export default AudioStreamer;
