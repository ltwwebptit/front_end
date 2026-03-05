"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Chrome, Github, Facebook } from 'lucide-react';
import styles from '../login/auth.module.css'; // Reusing auth styles
import { storage } from '../../../utils/storage';
import { useRouter } from 'next/navigation';
import AiGavelIcon from '../../../components/AiGavelIcon';

export default function RegisterPage() {
  const router = useRouter();
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
    storage.login();
    router.push('/');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandContainer}>
          <div className={styles.brandIcon}><AiGavelIcon size={32} /></div>
          <h1 className={styles.brandTitle}>AI Tra Cứu Luật</h1>
        </div>
        
        <h2 className={styles.authTitle}>Tạo tài khoản mới</h2>
        <p className={styles.authSubtitle}>Tham gia cộng đồng tra cứu luật thông minh ngay hôm nay.</p>

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

          <button type="submit" className={styles.submitBtn}>
            Đăng ký ngay <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.divider}>
          <span>Hoặc đăng ký với</span>
        </div>

        <div className={styles.socialOptions}>
          <button className={styles.socialBtn}>
            <Chrome size={20} /> Google
          </button>
          <button className={styles.socialBtn}>
            <Facebook size={20} /> Facebook
          </button>
        </div>

        <p className={styles.switchAuthInfo}>
          Đã có tài khoản? <Link href="/login" className={styles.switchAuthLink}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
