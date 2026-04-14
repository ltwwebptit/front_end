"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Github, Chrome, Facebook } from 'lucide-react';
import styles from './auth.module.css';
import { storage } from '../../../utils/storage';
import { useRouter } from 'next/navigation';
import AiGavelIcon from '../../../components/AiGavelIcon';
import { apiFetch } from '../../../utils/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      storage.login();
      router.push('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandContainer}>
          <div className={styles.brandIcon}><AiGavelIcon size={32} /></div>
          <h1 className={styles.brandTitle}>AI Tra Cứu Luật</h1>
        </div>
        
        <h2 className={styles.authTitle}>Chào mừng trở lại</h2>
        <p className={styles.authSubtitle}>Đăng nhập để tiếp tục trò chuyện với trợ lý pháp lý AI của bạn.</p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><Mail size={18} /></div>
            <input 
              type="text" 
              placeholder="Tên đăng nhập (Username)" 
              className={styles.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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



        <p className={styles.switchAuthInfo}>
          Chưa có tài khoản? <Link href="/register" className={styles.switchAuthLink}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
