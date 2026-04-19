"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { storage } from '../utils/storage';
import { apiFetch } from '../utils/api';

export default function AuthGuard({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password') || pathname.startsWith('/accept_account');

    if (isAuthPage) {
       setAuthorized(true);
       return;
    }

    const checkAuth = async () => {
      const isLoggedIn = storage.isLoggedIn();
      if (!isLoggedIn) {
        setAuthorized(false);
        router.push('/login');
        return;
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (!authorized && !pathname.startsWith('/login') && !pathname.startsWith('/register') && !pathname.startsWith('/accept_account') && !pathname.startsWith('/forgot-password')) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-app)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  return <>{children}</>;
}
