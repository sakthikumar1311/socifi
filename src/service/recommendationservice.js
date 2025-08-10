
class RecommendationService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Get personalized video recommendations
  async getRecommendations(userId, preferences = {}) {
    const cacheKey = `recommendations_${userId}_${JSON.stringify(preferences)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const queryParams = new URLSearchParams({
        userId,
        ...preferences
      });

      const response = await fetch(
        `${this.baseURL}/recommendations?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }

  // Get trending videos
  async getTrendingVideos(category = 'all', timeframe = '24h') {
    try {
      const response = await fetch(
        `${this.baseURL}/trending?category=${category}&timeframe=${timeframe}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trending videos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      throw error;
    }
  }

  // Get similar videos based on a video ID
  async getSimilarVideos(videoId, limit = 10) {
    try {
      const response = await fetch(
        `${this.baseURL}/videos/${videoId}/similar?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch similar videos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching similar videos:', error);
      throw error;
    }
  }

  // Update user preferences for better recommendations
  async updatePreferences(userId, preferences) {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${userId}/preferences`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(preferences)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      // Clear cache for this user
      for (const key of this.cache.keys()) {
        if (key.includes(`recommendations_${userId}`)) {
          this.cache.delete(key);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }

  // Track video interaction for improved recommendations
  async trackInteraction(videoId, interactionType, duration = null) {
    try {
      await fetch(`${this.baseURL}/interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          videoId,
          interactionType, // 'view', 'like', 'share', 'skip', etc.
          duration,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error tracking interaction:', error);
      // Don't throw error as this is non-critical
    }
  }

  // Clear recommendations cache
  clearCache() {
    this.cache.clear();
  }
}

export default new RecommendationService();

