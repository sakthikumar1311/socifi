import { useState, useEffect } from 'react';
import { recommendationService } from '../../services/recommendationService';

export const useRecommendations = (userId, videoId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const data = await recommendationService.getRecommendations(userId, videoId);
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRecommendations();
    }
  }, [userId, videoId]);

  const refreshRecommendations = () => {
    fetchRecommendations();
  };

  return {
    recommendations,
    loading,
    error,
    refreshRecommendations
  };
};