const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
  
  signup: async (userData: any) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Signup failed');
    return res.json();
  },

  // Articles
  getArticles: async () => {
    const res = await fetch(`${API_URL}/articles`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  },

  getArticle: async (id: string) => {
    const res = await fetch(`${API_URL}/articles/${id}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch article');
    return res.json();
  },

  createArticle: async (articleData: any) => {
    const res = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(articleData),
    });
    if (!res.ok) throw new Error('Failed to create article');
    return res.json();
  },

  updateArticle: async (id: string, articleData: any) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(articleData),
    });
    if (!res.ok) throw new Error('Failed to update article');
    return res.json();
  },

  deleteArticle: async (id: string) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete article (Status: ${res.status})`);
    }
  },

  // Feedback
  addFeedback: async (articleId: string, feedbackData: any) => {
    const res = await fetch(`${API_URL}/articles/${articleId}/feedback`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(feedbackData),
    });
    if (!res.ok) throw new Error('Failed to add feedback');
    return res.json();
  },

  // Tickets
  createTicket: async (ticketData: any) => {
    const res = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ticketData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create ticket');
    }
    return res.json();
  },

  getMyTickets: async () => {
    const res = await fetch(`${API_URL}/tickets/my`, { headers: getHeaders() });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch your tickets');
    }
    return res.json();
  },

  getAllTickets: async () => {
    const res = await fetch(`${API_URL}/tickets`, { headers: getHeaders() });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch tickets');
    }
    return res.json();
  },

  updateTicket: async (id: string, ticketData: any) => {
    const res = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(ticketData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update ticket');
    }
    return res.json();
  },
  
  deleteTicket: async (id: string) => {
    const res = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete ticket');
    }
  },
  
  // User Management
  getUsers: async () => {
    const res = await fetch(`${API_URL}/auth/users`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  updateUser: async (id: string, userData: any) => {
    const res = await fetch(`${API_URL}/auth/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  deleteUser: async (id: string) => {
    const res = await fetch(`${API_URL}/auth/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete user');
  },
};
