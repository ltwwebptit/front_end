"use client";

import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Paperclip, ChevronDown, Sparkles, User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './ChatArea.module.css';
import AiGavelIcon from './AiGavelIcon';
import { storage } from '../utils/storage';

export default function ChatArea({ messages, setMessages }) {
  const router = useRouter();
  const [inputVal, setInputVal] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setMessages([...messages, { role: 'user', text: inputVal }]);
    setInputVal('');
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'ai', 
          text: 'Theo quy định của pháp luật hiện hành, đây là một ví dụ về câu trả lời tự động để bạn hình dung giao diện. Câu hỏi của bạn đang được phân tích.' 
        }
      ]);
    }, 1000);
  };

  return (
    <main className={styles.mainChat}>
      <header className={styles.header}>
        <div className={styles.headerTab}>Chat với AI</div>
        <div className={styles.headerRight} ref={dropdownRef}>
          <div 
            className={styles.userProfile} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles.avatar}><User size={20} /></div>
          </div>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <p className={styles.dropdownName}>Trần Anh Tài</p>
                <p className={styles.dropdownEmail}>tai.tran@example.com</p>
              </div>
              <div className={styles.dropdownDivider}></div>
              <Link href="/profile" className={styles.dropdownItem}>
                <Settings size={16} /> Cài đặt & Hồ sơ
              </Link>
              <div className={styles.dropdownDivider}></div>
              <button 
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                onClick={() => {
                  storage.logout();
                  router.push('/login');
                }}
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </header>
      
      <div className={styles.chatContainer}>
        {messages.length === 0 ? (
          <div className={styles.welcomeScreen}>
            <div className={styles.brandIcon}><AiGavelIcon size={48} /></div>
            <h2 className={styles.welcomeTitle}>
              Trợ lý pháp lý AI <Sparkles size={24} className={styles.sparkleTitle} />
            </h2>
            <p className={styles.welcomeSubtitle}>Hỏi tôi bất cứ vấn đề pháp lý nào bạn đang quan tâm.</p>
            
            <div className={styles.suggestionGrid}>
              <button onClick={() => setInputVal('Thủ tục thành lập công ty TNHH 1 thành viên')} className={styles.suggestionChip}>
                Thủ tục thành lập công ty TNHH 1 thành viên
              </button>
              <button onClick={() => setInputVal('Mức phạt vi phạm nồng độ cồn mới nhất')} className={styles.suggestionChip}>
                Mức phạt vi phạm nồng độ cồn mới nhất
              </button>
              <button onClick={() => setInputVal('Điều kiện hưởng lương hưu năm 2024')} className={styles.suggestionChip}>
                Điều kiện hưởng lương hưu năm 2024
              </button>
              <button onClick={() => setInputVal('Quy định về nghỉ thai sản đối với nam')} className={styles.suggestionChip}>
                Quy định về nghỉ thai sản đối với nam
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((m, idx) => (
              <div key={idx} className={`${styles.messageWrapper} ${m.role === 'user' ? styles.msgUser : styles.msgAi}`}>
                {m.role === 'ai' && (
                  <div className={styles.msgAvatarWrapper}>
                    <div className={styles.msgAvatarAi}><AiGavelIcon size={20} color="white" /></div>
                  </div>
                )}
                <div className={styles.messageBubble}>
                  <p>{m.text}</p>
                </div>
                {m.role === 'user' && (
                   <div className={styles.msgAvatarWrapper}>
                     <div className={styles.msgAvatarUser}><User size={16} /></div>
                   </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <form onSubmit={sendMsg} className={styles.inputForm}>
            <div className={styles.modelSelector}>
              Model: <span className={styles.modelName}>Mặc định</span>
              <ChevronDown size={14} />
            </div>
            <textarea 
              className={styles.textarea}
              placeholder="Nhập câu hỏi pháp lý của bạn..."
              rows={1}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMsg(e);
                }
              }}
            />
            <div className={styles.inputActions}>
              <button type="button" className={styles.attachBtn}>
                <Paperclip size={20} />
              </button>
              <button type="submit" className={`${styles.sendBtn} ${inputVal.trim() ? styles.sendActive : ''}`} disabled={!inputVal.trim()}>
                <SendHorizontal size={18} />
              </button>
            </div>
          </form>
          <div className={styles.inputDisclaimer}>
            AI chỉ mang tính chất tham khảo. Không phải tư vấn pháp lý chính thức.
          </div>
        </div>
      </div>
    </main>
  );
}
