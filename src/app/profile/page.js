"use client";

import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { User, CreditCard, Settings, Camera, LogOut, ChevronRight, Shield, Bell } from 'lucide-react';
import { apiFetch } from '../../utils/api';
import { storage } from '../../utils/storage';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');
  const [profile, setProfile] = useState(null);
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    fetchProfile();
    const savedTheme = localStorage.getItem('ai_luat_theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'system') {
      localStorage.removeItem('ai_luat_theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    } else {
      localStorage.setItem('ai_luat_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await apiFetch('/api/auth/profile', { method: 'GET' });
      setProfile(data);
    } catch (err) {
      console.error('Không tải được profile', err);
    }
  };

  const handleUpdatePassword = async () => {
    if (!profile) return;
    try {
      await apiFetch('/api/auth/update-password', {
        method: 'PUT',
        body: JSON.stringify({
          username: profile.username,
          password: oldPwd,
          newPassword: newPwd
        })
      });
      alert("Đổi mật khẩu thành công!");
      setIsChangingPwd(false);
      setOldPwd('');
      setNewPwd('');
    } catch (err) {
      alert(err.message || 'Lỗi đổi mật khẩu');
    }
  };

  const handleLogout = () => {
    // clear token mechanism from cookies may need server support or just local clear
    storage.logout();
    router.push('/login');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Hồ sơ cá nhân</div>
      </div>

      <div className={styles.content}>
        <div className={styles.profileBox}>
          {/* User Banner */}
          <div className={styles.banner}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>T</div>
              <button className={styles.changeAvatarBtn}>
                <Camera size={14} />
              </button>
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{profile ? (profile.fullname || profile.username) : 'Đang tải...'}</h2>
              <p className={styles.userEmail}>{profile ? profile.email : '...'}</p>

            </div>
          </div>

          <div className={styles.dashboard}>
            {/* Sidebar / Tabs */}
            <div className={styles.tabList}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'account' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('account')}
              >
                <User size={18} /> Tài khoản
              </button>

              <button 
                className={`${styles.tabBtn} ${activeTab === 'preferences' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <Settings size={18} /> Cài đặt
              </button>
              <div className={styles.tabDivider}></div>
              <button className={`${styles.tabBtn} ${styles.logoutBtn}`} onClick={handleLogout}>
                <LogOut size={18} /> Đăng xuất
              </button>
            </div>

            {/* Tab Contents */}
            <div className={styles.tabPanel}>
              {activeTab === 'account' && (
                <div className={styles.panelSection}>
                  <h3 className={styles.panelTitle}>Thông tin tài khoản</h3>
                  <p className={styles.panelSubtitle}>Quản lý thông tin cá nhân và bảo mật của bạn.</p>
                  
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Họ và tên</label>
                      <input type="text" value={profile?.fullname || ''} disabled className={styles.inputField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Username</label>
                      <input type="text" value={profile?.username || ''} disabled className={styles.inputField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input type="email" value={profile?.email || ''} disabled className={styles.inputField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Mật khẩu</label>
                      {!isChangingPwd ? (
                        <button className={styles.actionBtn} onClick={() => setIsChangingPwd(true)}>
                           Đổi mật khẩu <ChevronRight size={16} />
                        </button>
                      ) : (
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                          <input type="password" placeholder="Mật khẩu cũ" value={oldPwd} onChange={e=>setOldPwd(e.target.value)} className={styles.inputField} />
                          <input type="password" placeholder="Mật khẩu mới" value={newPwd} onChange={e=>setNewPwd(e.target.value)} className={styles.inputField} />
                          <button className={styles.primaryBtn} onClick={handleUpdatePassword}>Lưu mật khẩu mới</button>
                          <button className={styles.outlineBtn} onClick={() => setIsChangingPwd(false)}>Hủy</button>
                        </div>
                      )}
                    </div>
                  </div>
                  


                </div>
              )}



              {activeTab === 'preferences' && (
                <div className={styles.panelSection}>
                  <h3 className={styles.panelTitle}>Cài đặt hệ thống</h3>
                  <p className={styles.panelSubtitle}>Tùy chỉnh trải nghiệm AI Tra Cứu Luật của bạn.</p>
                  
                  <div className={styles.settingsList}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Giao diện Tối/Sáng</h4>
                        <p>Tự động thay đổi theo hệ thống hoặc chọn cứng.</p>
                      </div>
                      <select className={styles.selectField} value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
                        <option value="system">Tự động hệ thống</option>
                        <option value="light">Giao diện Sáng</option>
                        <option value="dark">Giao diện Tối</option>
                      </select>
                    </div>
                    
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Ngôn ngữ trí tuệ nhân tạo</h4>
                        <p>Ngôn ngữ mặc định mà AI sẽ trả lời bạn.</p>
                      </div>
                      <select className={styles.selectField}>
                        <option>Tiếng Việt</option>
                        <option>English</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4><Bell size={16} style={{display: 'inline', marginRight: '4px'}}/> Thông báo Cập nhật luật</h4>
                        <p>Gửi email khi có luật mới liên quan đến các ngành bạn quan tâm.</p>
                      </div>
                      <label className={styles.toggleSwitch}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
