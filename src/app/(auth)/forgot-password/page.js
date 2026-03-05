"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Scale, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import styles from '../login/auth.module.css'; // Reusing auth styles

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
      // Simulate API call to send reset email
      setIsSubmitted(true);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandContainer}>
          <div className={styles.brandIcon}><Scale size={32} /></div>
          <h1 className={styles.brandTitle}>AI Tra Cứu Luật</h1>
        </div>
        
        {!isSubmitted ? (
          <>
            <h2 className={styles.authTitle}>Quên mật khẩu?</h2>
            <p className={styles.authSubtitle}>Đừng lo lắng! Nhập email liên kết với tài khoản của bạn, chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.</p>

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.inputGroup}>
                <div className={styles.inputPrefix}><Mail size={18} /></div>
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn" 
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Gửi liên kết khôi phục <ArrowRight size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle size={48} color="var(--primary)" />
            </div>
            <h2 className={styles.authTitle}>Đã gửi email khôi phục</h2>
            <p className={styles.authSubtitle}>
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu tới email <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến của bạn (bao gồm cả thư mục Spam).
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className={styles.resendBtn}
            >
              Gửi lại email
            </button>
          </div>
        )}

        <div className={styles.divider}></div>

        <Link href="/login" className={styles.backToLogin}>
          <ArrowLeft size={16} /> Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}
