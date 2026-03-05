"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Printer, Share2, Sparkles, MessageSquare, ChevronRight, Scale, CheckCircle2 } from 'lucide-react';
import styles from './docDetail.module.css';

export default function DocumentDetail() {
  const router = useRouter();
  const params = useParams();
  
  // Dummy text state for AI chat inside the panel
  const [aiInput, setAiInput] = useState('');

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} title="Tải xuống"><Download size={18} /></button>
          <button className={styles.iconBtn} title="In văn bản"><Printer size={18} /></button>
          <button className={styles.iconBtn} title="Chia sẻ"><Share2 size={18} /></button>
        </div>
      </header>

      <div className={styles.splitLayout}>
        {/* Left: Reading Area */}
        <div className={styles.readingArea}>
          <div className={styles.docPaper}>
            <div className={styles.docMeta}>
              <div className={styles.statusBadge}>Còn hiệu lực</div>
              <p className={styles.docNumber}>Số: 59/2020/QH14</p>
              <h1 className={styles.docTitle}>LUẬT DOANH NGHIỆP 2020</h1>
              <p className={styles.docSubMeta}>Ban hành: 17/06/2020 • Cơ quan ban hành: Quốc hội</p>
            </div>
            
            <div className={styles.docBody}>
              <h2 className={styles.chapterTitle}>CHƯƠNG I: QUY ĐỊNH CHUNG</h2>
              
              <h3 className={styles.articleTitle}>Điều 1. Phạm vi điều chỉnh</h3>
              <p className={styles.articleText}>
                Luật này quy định về việc thành lập, tổ chức quản lý, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp, bao gồm công ty trách nhiệm hữu hạn, công ty cổ phần, công ty hợp danh và doanh nghiệp tư nhân; quy định về nhóm công ty.
              </p>

              <h3 className={styles.articleTitle}>Điều 2. Đối tượng áp dụng</h3>
              <p className={styles.articleText}>
                1. Các doanh nghiệp.<br/>
                2. Cơ quan, tổ chức, cá nhân có liên quan đến việc thành lập, tổ chức quản lý, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp.
              </p>

              <h3 className={styles.articleTitle}>Điều 3. Áp dụng Luật Doanh nghiệp và luật khác</h3>
              <p className={styles.articleText}>
                Trường hợp luật khác có quy định đặc thù về việc thành lập, tổ chức quản lý, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp thì áp dụng quy định của luật đó.
              </p>
              
              <h2 className={styles.chapterTitle}>CHƯƠNG II: THÀNH LẬP DOANH NGHIỆP</h2>
              <h3 className={styles.articleTitle}>Điều 17. Quyền thành lập, góp vốn, mua cổ phần, mua phần vốn góp và quản lý doanh nghiệp</h3>
              <p className={styles.articleText}>
                1. Tổ chức, cá nhân có quyền thành lập và quản lý doanh nghiệp tại Việt Nam theo quy định của Luật này, trừ trường hợp quy định tại khoản 2 Điều này.<br/>
                2. Tổ chức, cá nhân sau đây không có quyền thành lập và quản lý doanh nghiệp tại Việt Nam:<br/>
                a) Cơ quan nhà nước, đơn vị lực lượng vũ trang nhân dân sử dụng tài sản nhà nước để thành lập doanh nghiệp kinh doanh thu lợi riêng cho cơ quan, đơn vị mình;<br/>
                b) Cán bộ, công chức, viên chức theo quy định của Luật Cán bộ, công chức và Luật Viên chức;
              </p>
            </div>
          </div>
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
