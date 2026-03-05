"use client";

import styles from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, MessageSquarePlus, MessageSquare, FileText, HelpCircle, User, Sparkles } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
          <div className={styles.logoIconBg}>
            <Scale size={22} color="white" />
          </div>
          <span className={styles.logoText}>AI Tra Cứu Luật</span>
        </Link>
        <Link href="/" className={styles.newChatBtn} style={{ textDecoration: 'none' }}>
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
              <a href="#" className={styles.navItem}>
                <HelpCircle size={18} /> Trợ giúp
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.upgradeCard}>
          <div className={styles.upgradeContent}>
            <h4 className={styles.upgradeTitle}><Sparkles size={14} className={styles.sparkleIcon}/> Tới Premium</h4>
            <p>Đăng nhập để trải nghiệm AI luật không giới hạn</p>
          </div>
          <Link href="/login" className={styles.upgradeBtn} style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Đăng nhập / Đăng ký</Link>
        </div>
      </div>
    </aside>
  );
}
