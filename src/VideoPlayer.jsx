import React, { useEffect, useState } from "react";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.108:3000/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  return (
    <div>
      <h1>Available Videos</h1>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        videos.map((video, index) => (
          <div key={index}>
            <h2>{video}</h2>
            <video controls width="640" height="480">
              <source
                src={`http://192.168.0.108:3000/videos/${video}`}
                type="video/mp4"
              />
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
        ))
      )}
    </div>
  );
};

export default VideoPlayer;
