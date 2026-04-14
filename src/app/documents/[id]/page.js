"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Printer, Share2, Sparkles, MessageSquare, ChevronRight, Scale, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '../../../utils/api';
import styles from './docDetail.module.css';

export default function DocumentDetail() {
  const router = useRouter();
  const params = useParams();
  
  // Dummy text state for AI chat inside the panel
  const [aiInput, setAiInput] = useState('');
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchDocDetail();
    }
  }, [params.id]);

  const fetchDocDetail = async () => {
    try {
      const data = await apiFetch(`/api/legal-documents/${params.id}`, { method: "GET" });
      setDocument(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={20} /> Quay lại
        </button>
      </header>

      <div className={styles.splitLayout}>
        {/* Left: Reading Area */}
        <div className={styles.readingArea}>
          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>Đang tải văn bản...</div>
          ) : !document ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>Không tìm thấy văn bản!</div>
          ) : (
            <div className={styles.docPaper}>
              <div className={styles.docMeta}>
                <div className={styles.statusBadge}>{document.status ? 'Còn hiệu lực' : 'Hết hiệu lực'}</div>
                <p className={styles.docNumber}>Số: {document.title.split(' ')[0]}</p>
                <h1 className={styles.docTitle}>{document.title.toUpperCase()}</h1>
                <p className={styles.docSubMeta}>Ban hành: {document.issueDate ? document.issueDate.split('T')[0] : ''} • Cơ quan ban hành: {document.issuingAgency}</p>
                {document.link && (
                  <a href={document.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontSize: "0.875rem", fontWeight: 500, marginTop: "0.5rem", textDecoration: "none" }}>
                    <Scale size={16} /> Xem văn bản gốc (Nguồn)
                  </a>
                )}
              </div>
              
              <div className={styles.docBody}>
                {document.content ? (
                  <div style={{ whiteSpace: "pre-wrap" }}>{document.content}</div>
                ) : (
                  <div>Nội dung văn bản đang được cập nhật...</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: AI Panel */}
        <div className={styles.aiPanel}>
          <div className={styles.aiHeader}>
            <div className={styles.aiHeaderTitle}>
              <Sparkles className={styles.sparkleIcon} size={20} />
              Trợ lý AI Tóm Tắt
            </div>
          </div>
          
          <div className={styles.aiContent}>
            {/* Quick Summary Card */}
            <div className={styles.summaryCard}>
              <h4 className={styles.summaryTitle}>
                <CheckCircle2 color="#10B981" size={16}/> Tóm tắt nhanh (TL;DR)
              </h4>
              <ul className={styles.summaryList}>
                <li>Quy định toàn diện về vòng đời của mọi loại hình doanh nghiệp tại VN.</li>
                <li>Bảo vệ quyền lợi nhà đầu tư và cổ đông thiểu số tốt hơn so với Luật 2014.</li>
                <li>Đơn giản hóa thủ tục hành chính, bỏ yêu cầu thông báo mẫu dấu.</li>
              </ul>
            </div>

            {/* Smart Navigation */}
            <div className={styles.smartNav}>
              <h4 className={styles.smartNavTitle}>Điểm nổi bật trong văn bản</h4>
              <button className={styles.smartNavBtn}>
                Quy định về Doanh nghiệp Nhà nước <ChevronRight size={14}/>
              </button>
              <button className={styles.smartNavBtn}>
                Quyền của Cổ đông phổ thông <ChevronRight size={14}/>
              </button>
              <button className={styles.smartNavBtn}>
                Chuyển đổi loại hình công ty <ChevronRight size={14}/>
              </button>
            </div>

            {/* In-Panel Chat */}
            <div className={styles.panelChat}>
              <p className={styles.chatPrompt}>Bạn chưa rõ điều khoản nào?</p>
              <div className={styles.chatBox}>
                <div className={styles.chatAiBubble}>
                  Hãy hỏi tôi bất kỳ điều kiện pháp lý nào liên quan cụ thể đến <strong>"Luật Doanh nghiệp 2020"</strong>!
                </div>
              </div>
              <div className={styles.chatInputWrapper}>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Điều 17 khoản 2b nghĩa là sao?..."
                  className={styles.chatInput}
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <button className={styles.chatSendBtn}>
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
