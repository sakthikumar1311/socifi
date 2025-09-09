import api from './api';
import io from 'socket.io-client';

class MessageService {
  constructor() {
    this.socket = null;
  }

  initSocket() {
    this.socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001');
    return this.socket;
  }

  async sendMessage(roomId, message) {
    try {
      const response = await api.post('/messages', {
        roomId,
        text: message.text,
        type: message.type || 'text'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }

  async getMessages(roomId, limit = 50, offset = 0) {
    try {
      const response = await api.get(`/messages/${roomId}`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  }

  async deleteMessage(messageId) {
    try {
      await api.delete(`/messages/${messageId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete message');
    }
  }
}
import api from './api';
import io from 'socket.io-client';

class MessageService {
  constructor() {
    this.socket = null;
  }

  initSocket() {
    this.socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001');
    return this.socket;
  }

  async sendMessage(roomId, message) {
    try {
      const response = await api.post('/messages', {
        roomId,
        text: message.text,
        type: message.type || 'text'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }

  async getMessages(roomId, limit = 50, offset = 0) {
    try {
      const response = await api.get(`/messages/${roomId}`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  }

  async deleteMessage(messageId) {
    try {
      await api.delete(`/messages/${messageId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete message');
    }
  }
}
