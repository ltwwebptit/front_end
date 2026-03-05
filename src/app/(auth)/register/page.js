"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Scale, Mail, Lock, User, ArrowRight, Chrome, Github } from 'lucide-react';
import styles from '../login/auth.module.css'; // Reusing auth styles

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    // Simulate register
    window.location.href = '/';
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandContainer}>
          <div className={styles.brandIcon}><Scale size={32} /></div>
          <h1 className={styles.brandTitle}>AI Tra Cứu Luật</h1>
        </div>
        
        <h2 className={styles.authTitle}>Tạo tài khoản mới</h2>
        <p className={styles.authSubtitle}>Tham gia nền tảng AI tư vấn pháp luật hàng đầu ngay hôm nay.</p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><User size={18} /></div>
            <input 
              type="text" 
              placeholder="Họ và tên" 
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><Lock size={18} /></div>
            <input 
              type="password" 
              placeholder="Xác nhận mật khẩu" 
              className={styles.inputField}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.authOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" required />
              <span>Tôi đồng ý với Điều khoản và Chăm sóc bảo mật</span>
            </label>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Đăng ký tài khoản <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.divider}>
          <span>Hoặc đăng ký bằng</span>
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
          Đã có tài khoản? <Link href="/login" className={styles.switchAuthLink}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
