"use client";

import { useState } from 'react';
import styles from './help.module.css';
import { Mail, FileText, Phone, HelpCircle, X, BookOpen, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

export default function HelpPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = (type) => {
    setActiveModal(type);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => closeModal(), 2000);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className={styles.content}>
          <div className={styles.helpBox}>
            
            <div className={styles.headerSection}>
              <h1 className={styles.title}>Chúng tôi có thể giúp gì cho bạn?</h1>
              <p className={styles.subtitle}>
                Khám phá các câu hỏi thường gặp hoặc liên hệ trực tiếp với đội ngũ hỗ trợ của AI Tra Cứu Luật.
              </p>
            </div>

            <div className={styles.grid}>
              <div className={styles.card} onClick={() => handleOpenModal('email')} style={{cursor: 'pointer'}}>
                <div className={styles.cardIcon}>
                  <Mail size={24} />
                </div>
                <h3 className={styles.cardTitle}>Gửi Email Hỗ trợ</h3>
                <p className={styles.cardDesc}>
                  Gửi câu hỏi hoặc phản hồi chi tiết về cho đội ngũ phát triển tại hòm thư: <strong>support@ailuat.vn</strong>. Chúng tôi sẽ phản hồi trong 24h.
                </p>
              </div>

              <div className={styles.card} onClick={() => handleOpenModal('guide')} style={{cursor: 'pointer'}}>
                <div className={styles.cardIcon}>
                  <FileText size={24} />
                </div>
                <h3 className={styles.cardTitle}>Tài liệu Hướng dẫn</h3>
                <p className={styles.cardDesc}>
                  Đọc các bài viết chi tiết hướng dẫn cách sử dụng nền tảng hiệu quả nhất để tra cứu luật và tương tác với AI.
                </p>
              </div>

              <div className={styles.card} onClick={() => handleOpenModal('phone')} style={{cursor: 'pointer'}}>
                <div className={styles.cardIcon}>
                  <Phone size={24} />
                </div>
                <h3 className={styles.cardTitle}>Tổng đài hỗ trợ 24/7</h3>
                <p className={styles.cardDesc}>
                  Gọi điện trực tiếp cho tổng đài viên tư vấn qua số Hotline Miễn phí: <strong>1900 1234</strong>
                </p>
              </div>
            </div>

            <div className={styles.faqSection}>
              <h2 className={styles.faqTitle}>Câu hỏi thường gặp (FAQ)</h2>
              <div className={styles.faqList}>
                <div className={styles.faqItem}>
                  <div className={styles.faqQuestion}>
                    <HelpCircle size={18} />
                    AI Tra Cứu Luật lấy dữ liệu từ đâu?
                  </div>
                  <div className={styles.faqAnswer}>
                    Hệ thống AI của chúng tôi được huấn luyện trên cơ sở dữ liệu pháp luật chính thống của Việt Nam (Luật, Nghị định, Thông tư...) được cập nhật thường xuyên từ Cổng thông tin điện tử Chính phủ và Thư viện Pháp luật.
                  </div>
                </div>

                <div className={styles.faqItem}>
                  <div className={styles.faqQuestion}>
                    <HelpCircle size={18} />
                    Kết quả trả về của AI có giá trị pháp lý không?
                  </div>
                  <div className={styles.faqAnswer}>
                    Câu trả lời của AI chỉ mang <strong>tính chất tham khảo</strong> và hỗ trợ thông tin nhanh chóng. Nó không thay thế cho lời khuyên pháp lý chính thức từ Luật sư có chứng chỉ hành nghề. Vui lòng tham vấn ý kiến Luật sư trước khi đưa ra các quyết định pháp lý quan trọng.
                  </div>
                </div>

                <div className={styles.faqItem}>
                  <div className={styles.faqQuestion}>
                    <HelpCircle size={18} />
                    Tôi có thể lưu lại lịch sử độ hội thoại không?
                  </div>
                  <div className={styles.faqAnswer}>
                    Có. Toàn bộ lịch sử cuộc trò chuyện (chat) của bạn với AI sẽ được lưu trữ an toàn trong tài khoản của bạn để dễ dàng tra cứu lại sau này (bấm vào phần "Cuộc trò chuyện" trên thanh Menu trái).
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {activeModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={closeModal}>
              <X size={20} />
            </button>
            <div className={styles.modalInner}>
              <div className={styles.modalIcon}>
                {activeModal === 'email' && <Mail size={28} />}
                {activeModal === 'guide' && <BookOpen size={28} />}
                {activeModal === 'phone' && <PhoneCall size={28} />}
              </div>
              <h3 className={styles.modalTitle}>
                {activeModal === 'email' && 'Gửi Yêu Cầu Hỗ Trợ'}
                {activeModal === 'guide' && 'Tài liệu Hướng dẫn'}
                {activeModal === 'phone' && 'Tổng đài Tư vấn'}
              </h3>
              <p className={styles.modalDesc}>
                {activeModal === 'email' && 'Điền thông tin và để lại lời nhắn, chúng tôi sẽ email lại cho bạn.'}
                {activeModal === 'guide' && 'Các chủ đề phổ biến người dùng thường quan tâm.'}
                {activeModal === 'phone' && 'Chúng tôi luôn sẵn sàng lắng nghe bạn qua hotline dưới đây.'}
              </p>
              
              {activeModal === 'guide' ? (
                <div className={styles.guideList}>
                  <div className={styles.guideItem}><FileText size={16}/> Cách bắt đầu cuộc trò chuyện đầu tiên</div>
                  <div className={styles.guideItem}><FileText size={16}/> Hướng dẫn tìm kiếm văn bản luật nhanh</div>
                  <div className={styles.guideItem}><FileText size={16}/> Quản lý lịch sử và tài liệu đã lưu</div>
                  <div className={styles.guideItem}><FileText size={16}/> Cách đặt câu hỏi để AI trả lời chính xác nhất</div>
                </div>
              ) : activeModal === 'phone' ? (
                <div className={styles.hotlineContent}>
                  <div className={styles.phoneHighlight}>1900 1234</div>
                  <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem'}}>Thời gian làm việc: 8:00 - 22:00 tất cả các ngày</p>
                  <button className={styles.phoneBtn}>
                    <Phone size={20} /> Gọi Ngay
                  </button>
                </div>
              ) : isSubmitted ? (
                <div className={styles.successMsg}>
                  Đã gửi yêu cầu thành công!
                </div>
              ) : (
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                  <input type="text" placeholder="Họ và tên" required className={styles.modalInput} />
                  <input type="email" placeholder="Email liên hệ" required className={styles.modalInput} />
                  <textarea 
                    placeholder="Nội dung phản hồi hoặc câu hỏi chi tiết..." 
                    required 
                    className={styles.modalTextarea}
                  ></textarea>
                  <button type="submit" className={styles.submitBtn}>
                    Gửi Yêu Cầu
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
