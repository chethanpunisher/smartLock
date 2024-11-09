import React, { useState, useEffect } from 'react';

function SavedFiles() {
  const [videos, setVideos] = useState([]);

  // Fetch the list of videos (in this case, you can hard-code the video links or dynamically fetch them from the server)


  const serverURL = "http://192.168.0.104:3000/videos";

  return (
    <div className="SavedFiles">
      <h1>Available Videos</h1>
      <div>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index}>
              <h2>{video}</h2>
              <video width="600" controls>
                <source src={`${serverURL}${video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
}

export default SavedFiles;
