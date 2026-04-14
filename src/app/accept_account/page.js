"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { apiFetch } from "../../utils/api";
import Link from "next/link";
import styles from "../(auth)/login/auth.module.css";
import AiGavelIcon from "../../components/AiGavelIcon";

function AcceptAccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("Đang xử lý kích hoạt tài khoản...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Không tìm thấy mã xác thực (Token) trong đường dẫn.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await apiFetch(`/api/auth/accept_account?token=${token}`, {
          method: "GET",
        });
        setStatus("success");
        setMessage(res?.message || "Tài khoản của bạn đã được kích hoạt thành công!");
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Mã kích hoạt không hợp lệ, hoặc đã hết hạn.");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandContainer}>
          <div className={styles.brandIcon}><AiGavelIcon size={32} /></div>
          <h1 className={styles.brandTitle}>AI Tra Cứu Luật</h1>
        </div>

        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          {status === "loading" && (
            <>
              <Loader2 size={56} className="animate-spin" color="var(--primary)" style={{ margin: "0 auto 1.5rem" }} />
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Đang kích hoạt...</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle size={56} color="#16a34a" style={{ margin: "0 auto 1.5rem" }} />
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#16a34a" }}>Kích hoạt thành công!</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "2rem" }}>
                {message} <br /> Bây giờ bạn đã có thể đăng nhập vào hệ thống.
              </p>
              <button className={styles.submitBtn} onClick={() => router.push("/login")}>
                Đến trang Đăng nhập
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle size={56} color="#dc2626" style={{ margin: "0 auto 1.5rem" }} />
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#dc2626" }}>Kích hoạt thất bại</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "2rem" }}>
                {message}
              </p>
              <button className={styles.submitBtn} onClick={() => router.push("/login")}>
                Quay lại trang Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AcceptAccountPage() {
  return (
    <Suspense fallback={<div>Đang tải giao diện...</div>}>
      <AcceptAccountContent />
    </Suspense>
  );
}
 // check
