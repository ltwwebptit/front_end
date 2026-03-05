"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Scale, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import styles from './auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    window.location.href = '/';
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandContainer}>
          <div className={styles.brandIcon}><Scale size={32} /></div>
          <h1 className={styles.brandTitle}>AI Tra Cứu Luật</h1>
        </div>
        
        <h2 className={styles.authTitle}>Chào mừng trở lại</h2>
        <p className={styles.authSubtitle}>Đăng nhập để tiếp tục trò chuyện với trợ lý pháp lý AI của bạn.</p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><Mail size={18} /></div>
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><Lock size={18} /></div>
            <input 
              type="password" 
              placeholder="Mật khẩu" 
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.authOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link href="/forgot-password" className={styles.forgotPassword}>Quên mật khẩu?</Link>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Đăng nhập <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.divider}>
          <span>Hoặc tiếp tục với</span>
        </div>

        <div className={styles.socialOptions}>
          <button className={styles.socialBtn}>
            <Chrome size={20} /> Google
          </button>
          <button className={styles.socialBtn}>
            <Github size={20} /> Github
          </button>
        </div>

        <p className={styles.switchAuthInfo}>
          Chưa có tài khoản? <Link href="/register" className={styles.switchAuthLink}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
