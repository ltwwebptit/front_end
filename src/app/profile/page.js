"use client";

import { useState } from 'react';
import styles from './profile.module.css';
import { User, CreditCard, Settings, Camera, LogOut, ChevronRight, Shield, Bell } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');

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
              <h2 className={styles.userName}>Trần Anh Tài</h2>
              <p className={styles.userEmail}>tai.tran@example.com</p>

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
              <button className={`${styles.tabBtn} ${styles.logoutBtn}`}>
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
                      <input type="text" defaultValue="Trần Anh Tài" className={styles.inputField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input type="email" defaultValue="tai.tran@example.com" className={styles.inputField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Mật khẩu</label>
                      <button className={styles.actionBtn}>
                         Đổi mật khẩu <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.securityBox}>
                     <Shield size={24} color="var(--primary)" />
                     <div>
                       <h4>Xác thực 2 yếu tố (2FA)</h4>
                       <p>Thêm một lớp bảo mật phụ cho tài khoản của bạn.</p>
                     </div>
                     <button className={styles.outlineBtn}>Bật 2FA</button>
                  </div>

                  <div className={styles.saveAction}>
                    <button className={styles.primaryBtn}>Lưu thay đổi</button>
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
                      <select className={styles.selectField}>
                        <option>Tự động</option>
                        <option>Giao diện Sáng</option>
                        <option>Giao diện Tối</option>
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
