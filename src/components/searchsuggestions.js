// components/SearchSuggestions.jsx
import React from 'react';
import './SearchSuggestions.css';

const SearchSuggestions = ({ suggestions, onSelect, isVisible }) => {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div className="search-suggestions">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion-item"
          onClick={() => onSelect(suggestion)}
        >
          <div className="suggestion-icon">🔍</div>
          <div className="suggestion-content">
            <span className="suggestion-text">{suggestion.text}</span>
            {suggestion.category && (
              <span className="suggestion-category">{suggestion.category}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;