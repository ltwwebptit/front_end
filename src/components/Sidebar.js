"use client";

import styles from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquarePlus, MessageSquare, FileText, HelpCircle, User, Sparkles, History } from 'lucide-react';
import AiGavelIcon from './AiGavelIcon';

export default function Sidebar({ onNewChat }) {
  const pathname = usePathname();

  const handleNewChat = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      if (onNewChat) onNewChat();
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
          <div className={styles.logoIconBg}>
            <AiGavelIcon size={22} color="white" />
          </div>
          <span className={styles.logoText}>AI Tra Cứu Luật</span>
        </Link>
        <Link 
          href="/" 
          className={styles.newChatBtn} 
          style={{ textDecoration: 'none' }}
          onClick={handleNewChat}
        >
          <MessageSquarePlus size={18} /> Chat Mới
        </Link>
      </div>

      <nav className={styles.navMenu}>
        <div className={styles.navSection}>
          <h3 className={styles.navTitle}>Menu Chính</h3>
          <ul>
            <li>
              <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.navActive : ''}`}>
                <MessageSquare size={18} /> Cuộc trò chuyện
              </Link>
            </li>
            <li>
              <Link href="/history" className={`${styles.navItem} ${pathname === '/history' ? styles.navActive : ''}`}>
                <History size={18} /> Lịch sử Chat
              </Link>
            </li>
            <li>
              <Link href="/documents" className={`${styles.navItem} ${pathname === '/documents' ? styles.navActive : ''}`}>
                <FileText size={18} /> Văn bản pháp lý
              </Link>
            </li>
            <li>
              <Link href="/profile" className={`${styles.navItem} ${pathname === '/profile' ? styles.navActive : ''}`}>
                <User size={18} /> Hồ sơ của tôi
              </Link>
            </li>
            <li>
              <Link href="/help" className={`${styles.navItem} ${pathname === '/help' ? styles.navActive : ''}`}>
                <HelpCircle size={18} /> Trợ giúp
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
