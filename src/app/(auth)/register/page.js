"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Chrome, Github, Facebook } from 'lucide-react';
import styles from '../login/auth.module.css'; // Reusing auth styles
import { storage } from '../../../utils/storage';
import { useRouter } from 'next/navigation';
import AiGavelIcon from '../../../components/AiGavelIcon';
import { apiFetch } from '../../../utils/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState(''); 
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(name)) {
      setError('Tên đăng nhập không được có dấu cách, tiếng Việt hoặc ký tự đặc biệt lạ!');
      return;
    }
    
    if(password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    try {
      // Dùng state name truyền vào username theo API Register
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, username: name, password, fullname })
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại. Email hoặc username có thể đã tồn tại.');
    }
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
          {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
          {success && <div style={{ color: 'green', textAlign: 'center', marginBottom: '1rem' }}>Đăng ký thành công! Đang chuyển hướng đăng nhập...</div>}
          
          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><User size={18} /></div>
            <input 
              type="text" 
              placeholder="Tên đăng nhập (không dấu cách, không tiếng Việt)" 
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputPrefix}><User size={18} /></div>
            <input 
              type="text" 
              placeholder="Họ và tên của bạn" 
              className={styles.inputField}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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



        <p className={styles.switchAuthInfo}>
          Đã có tài khoản? <Link href="/login" className={styles.switchAuthLink}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
