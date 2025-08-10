import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import SearchSuggestions from '../components/SearchSuggestions';
import { useRecommendations } from '../features/recommendations/useRecommendations';
import { useSearchSuggest } from '../features/search/useSearchSuggest';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { user } = useAuth();
  const { recommendations, loading } = useRecommendations(user?.id);
  const { suggestions, getSuggestions } = useSearchSuggest();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
    getSuggestions(query);
  };

  const handleVideoPlay = (video) => {
    console.log('Playing video:', video);
    // Navigate to video player
  };

  const handleVideoLike = (videoId, liked) => {
    console.log('Video liked:', videoId, liked);
    // Update like status
  };

  const handleVideoShare = (video) => {
    console.log('Sharing video:', video);
    // Open share modal
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <SearchSuggestions
            suggestions={suggestions}
            isVisible={showSuggestions}
            onSelect={(suggestion) => {
              setSearchQuery(suggestion.text);
              setShowSuggestions(false);
            }}
          />
        </div>
      </header>

      <main className="main-content">
        <h1>Recommended Videos</h1>
        {loading ? (
          <div className="loading">Loading recommendations...</div>
        ) : (
          <div className="video-grid">
            {recommendations.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={handleVideoPlay}
                onLike={handleVideoLike}
                onShare={handleVideoShare}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;