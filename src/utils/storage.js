"use client";

const STORAGE_KEY = 'ai_luat_chat_history';
const AUTH_KEY = 'ai_luat_is_logged_in';
const ACTIVE_SESSION_KEY = 'ai_luat_active_session';

export const storage = {
  // Auth
  isLoggedIn: () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_KEY) === 'true';
  },
  login: () => localStorage.setItem(AUTH_KEY, 'true'),
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  },

  // Sessions
  getHistory: () => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSession: (session) => {
    const history = storage.getHistory();
    const index = history.findIndex(s => s.id === session.id);
    if (index > -1) {
      history[index] = session;
    } else {
      history.unshift(session);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  },

  deleteSession: (id) => {
    const history = storage.getHistory().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    if (storage.getActiveSessionId() === id) {
      storage.clearActiveSession();
    }
  },

  // Active Session
  setActiveSession: (id) => localStorage.setItem(ACTIVE_SESSION_KEY, id),
  getActiveSessionId: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACTIVE_SESSION_KEY);
  },
  clearActiveSession: () => localStorage.removeItem(ACTIVE_SESSION_KEY),
};
