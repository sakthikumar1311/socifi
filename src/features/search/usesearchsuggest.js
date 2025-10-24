
// features/search/useSearchSuggest.js
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export const useSearchSuggest = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

// features/search/useSearchSuggest.js
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export const useSearchSuggest = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  return {
    suggestions,
    loading,
    getSuggestions: debouncedFetch
  };
};
    try {
      setLoading(true);
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  return {
    suggestions,
    loading,
    getSuggestions: debouncedFetch
  };
};
