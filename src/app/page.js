"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import { storage } from '../utils/storage';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // Load active session from storage on mount
  useEffect(() => {
    const activeId = storage.getActiveSessionId();
    if (activeId) {
      const history = storage.getHistory();
      const session = history.find(s => s.id === parseInt(activeId));
      if (session) {
        setMessages(session.messages || []);
        setCurrentSessionId(session.id);
      }
    }
  }, []);

  // Save messages to current session in storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const id = currentSessionId || Date.now();
      if (!currentSessionId) setCurrentSessionId(id);

      const sessionTitle = messages[0].text.substring(0, 30) + (messages[0].text.length > 30 ? '...' : '');

      storage.saveSession({
        id,
        title: sessionTitle,
        snippet: messages[messages.length - 1].text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: messages,
        fullDate: new Date().toISOString()
      });
    }
  }, [messages, currentSessionId]);

  const resetChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    storage.clearActiveSession();
  };

  return (
    <div className="app-container">
      <Sidebar onNewChat={resetChat} />
      <ChatArea messages={messages} setMessages={setMessages} />
    </div>
  );
}