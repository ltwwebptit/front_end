"use client";

import { useState, useEffect } from 'react';
import styles from './history.module.css';
import Sidebar from '../../components/Sidebar';
import { Search, MessageSquare, Trash2, Clock, Calendar, ChevronRight, History } from 'lucide-react';
import Link from 'next/link';
import { storage } from '../../utils/storage';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyItems, setHistoryItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setHistoryItems(storage.getHistory());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này?')) {
      storage.deleteSession(id);
      setHistoryItems(storage.getHistory());
    }
  };

  const handleViewSession = (id) => {
    storage.setActiveSession(id);
    router.push('/');
  };

  // Grouping logic
  const groupHistory = (items) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = {
      'Hôm nay': [],
      'Hôm qua': [],
      'Cũ hơn': []
    };

    items.forEach(item => {
      const itemDate = new Date(item.fullDate || item.id); // fallback to id if fullDate missing
      itemDate.setHours(0, 0, 0, 0);

      if (itemDate.getTime() === today.getTime()) {
        groups['Hôm nay'].push(item);
      } else if (itemDate.getTime() === yesterday.getTime()) {
        groups['Hôm qua'].push(item);
      } else {
        groups['Cũ hơn'].push(item);
      }
    });

    return Object.entries(groups).filter(([_, sessions]) => sessions.length > 0);
  };

  const filteredItems = historyItems.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.snippet && s.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedHistory = groupHistory(filteredItems);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className={styles.historyContent}>
          <div className={styles.historyBox}>
            
            <header className={styles.header}>
              <div className={styles.titleSection}>
                <h1 className={styles.title}>Lịch sử Tư vấn</h1>
              </div>
              
              <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm trong lịch sử cuộc trò chuyện..." 
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </header>

            <div className={styles.historyList}>
              {groupedHistory.length > 0 ? (
                groupedHistory.map(([period, sessions], idx) => (
                  <div key={idx} className={styles.section}>
                    <h3 className={styles.sectionHeader}>{period}</h3>
                    <div className={styles.cardsGrid}>
                      {sessions.map((session) => (
                        <div 
                          key={session.id} 
                          className={styles.historyCard}
                          onClick={() => handleViewSession(session.id)}
                        >
                          <div className={styles.cardLeft}>
                            <div className={styles.iconWrapper}>
                              <MessageSquare size={20} />
                            </div>
                            <div className={styles.sessionInfo}>
                              <h4 className={styles.sessionTitle}>{session.title}</h4>
                              <p className={styles.sessionSnippet}>{session.snippet}</p>
                            </div>
                          </div>
                          
                          <div className={styles.cardRight}>
                            <span className={styles.timestamp}>{session.time}</span>
                            <div className={styles.actionRow}>
                              <button 
                                className={styles.actionBtn} 
                                title="Xóa"
                                onClick={(e) => handleDelete(session.id, e)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <History size={48} className={styles.emptyIcon} />
                  <p>{searchTerm ? `Không tìm thấy kết quả phù hợp với "${searchTerm}"` : 'Bạn chưa có lịch sử tư vấn nào.'}</p>
                  {!searchTerm && (
                    <Link href="/" className={styles.startBtn} style={{ textDecoration: 'none', marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                      Bắt đầu chat ngay
                    </Link>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
