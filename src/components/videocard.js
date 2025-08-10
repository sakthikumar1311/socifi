// components/VideoCard.jsx
import React, { useState } from 'react';
import './VideoCard.css';

const VideoCard = ({ video, onPlay, onLike, onShare }) => {
  const [isLiked, setIsLiked] = useState(video.isLiked || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(video.id, !isLiked);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-card">
      <div className="video-thumbnail" onClick={() => onPlay(video)}>
        <img src={video.thumbnail} alt={video.title} />
        <div className="video-duration">{formatDuration(video.duration)}</div>
        <div className="play-button">▶</div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-creator">{video.creator}</p>
        <div className="video-stats">
          <span>{video.views} views</span>
          <span>{video.uploadDate}</span>
        </div>
        <div className="video-actions">
          <button
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            👍 {video.likes + (isLiked ? 1 : 0)}
          </button>
          <button className="share-button" onClick={() => onShare(video)}>
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;