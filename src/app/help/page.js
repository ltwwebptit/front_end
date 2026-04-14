"use client";

import { useState, useEffect } from 'react';
import styles from './help.module.css';
import { Mail, FileText, Phone, HelpCircle, X, BookOpen, PhoneCall } from 'lucide-react';
import { apiFetch } from '../../utils/api';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

export default function HelpPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [emailMsg, setEmailMsg] = useState('');
  const [emailName, setEmailName] = useState('');
  const [emailContact, setEmailContact] = useState('');
  const [profile, setProfile] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    fetchFaqs();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiFetch('/api/auth/profile', { method: 'GET' });
      setProfile(data);
      if (data) {
        setEmailName(data.username || '');
        setEmailContact(data.email || '');
      }
    } catch (err) {
      console.warn('Không lấy được profile, có thể chưa đăng nhập:', err);
    }
  };

  const fetchFaqs = async () => {
    try {
      const data = await apiFetch('/api/faq', { method: 'GET' });
      setFaqs(data || []);
    } catch (err) {
      console.error('Lỗi tải FAQ:', err);
    }
  };

  const guideContents = {
    'start': {
      title: 'Cách bắt đầu cuộc trò chuyện đầu tiên',
      content: (
        <ul className={styles.guideDetailList}>
          <li><strong>Bước 1:</strong> Truy cập vào trang chủ từ thanh điều hướng bên trái.</li>
          <li><strong>Bước 2:</strong> Nhập câu hỏi hoặc tình huống pháp lý bạn đang gặp phải vào ô nhập liệu ở dưới cùng.</li>
          <li><strong>Bước 3:</strong> Nhấn phím <strong>Enter</strong> hoặc biểu tượng <strong>Gửi</strong>. AI sẽ phân tích kho dữ liệu luật đồ sộ để đưa ra câu trả lời chính xác nhất cho bạn.</li>
        </ul>
      )
    },
    'search': {
      title: 'Hướng dẫn tìm kiếm văn bản luật nhanh',
      content: (
        <ul className={styles.guideDetailList}>
          <li><strong>Sử dụng bộ lọc:</strong> Tại mục "Tra cứu văn bản", bạn có thể lọc nhanh theo Năm ban hành, Cơ quan ban hành (Chính phủ, Quốc hội...) hoặc Loại văn bản.</li>
          <li><strong>Tìm theo từ khóa:</strong> Nhập tên văn bản hoặc số hiệu văn bản vào ô tìm kiếm để hệ thống quét nhanh hơn.</li>
          <li><strong>Phân trang:</strong> Hệ thống hỗ trợ phân trang để bạn không bỏ lỡ bất kỳ dữ liệu nào khi có quá nhiều kết quả trùng khớp.</li>
        </ul>
      )
    },
    'history': {
      title: 'Quản lý lịch sử và tài liệu đã lưu',
      content: (
        <ul className={styles.guideDetailList}>
          <li><strong>Lịch sử trò chuyện:</strong> Mọi phiên chat của bạn đều được lưu lại tự động ở thanh Sidebar bên trái. Bạn có thể nhấn vào để xem lại bất cứ lúc nào.</li>
          <li><strong>Xóa lịch sử:</strong> Bạn có thể dọn dẹp danh mục chat bằng cách nhấn vào biểu tượng thùng rác ở cạnh tên phiên chat đó.</li>
          <li><strong>Tra cứu lại:</strong> Khi click vào một văn bản trong kho dữ liệu, hệ thống sẽ mở ra giao diện đọc chuyên sâu kèm trợ lý AI tóm tắt nội dung văn bản đó.</li>
        </ul>
      )
    },
    'prompt': {
      title: 'Đặt câu hỏi để AI trả lời chính xác nhất',
      content: (
        <ul className={styles.guideDetailList}>
          <li><strong>Cung cấp ngữ cảnh:</strong> Thay vì hỏi chung chung "Lương hưu là gì?", hãy hỏi "Lương hưu của nhân viên hành chính có 20 năm đóng bảo hiểm được tính thế nào?".</li>
          <li><strong>Số hiệu văn bản:</strong> Nếu bạn biết số hiệu (Ví dụ: Luật Doanh nghiệp 2020), hãy đưa nó vào câu hỏi để AI ưu tiên tra cứu nguồn đó.</li>
          <li><strong>Ngắn gọn & Tập trung:</strong> Mỗi lần chỉ nên hỏi một vấn đề pháp lý duy nhất để AI không bị nhầm lẫn giữa các điều hành khác nhau.</li>
        </ul>
      )
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedGuide(null);
    setIsSubmitted(false);
  };

  const handleOpenModal = (type) => {
    setActiveModal(type);
    setSelectedGuide(null);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeModal === 'email') {
      if (!profile || !profile.id) {
        alert("Vui lòng đăng nhập trước khi gửi yêu cầu hỗ trợ.");
        return;
      }
      try {
        await apiFetch('/api/support-request', {
          method: 'POST',
          body: JSON.stringify({
            userId: profile.id, 
            subject: `Hỗ trợ từ: ${emailName} (${emailContact})`,
            message: emailMsg
          })
        });
        setIsSubmitted(true);
        setTimeout(() => closeModal(), 2000);
      } catch (err) {
        alert(err.message || 'Lỗi gửi yêu cầu hỗ trợ.');
      }
    } else {
      setIsSubmitted(true);
      setTimeout(() => closeModal(), 2000);
    }
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
                {faqs.length > 0 ? faqs.map(faq => (
                  <div className={styles.faqItem} key={faq.id}>
                    <div className={styles.faqQuestion}>
                      <HelpCircle size={18} />
                      {faq.question}
                    </div>
                    <div className={styles.faqAnswer}>
                      {faq.answer}
                    </div>
                  </div>
                )) : (
                  <div style={{ color: 'var(--text-muted)' }}>Đang tải câu hỏi thường gặp...</div>
                )}
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
                {activeModal === 'guide' && (selectedGuide ? guideContents[selectedGuide].title : 'Tài liệu Hướng dẫn')}
                {activeModal === 'phone' && 'Tổng đài Tư vấn'}
              </h3>
              <p className={styles.modalDesc}>
                {activeModal === 'email' && 'Điền thông tin và để lại lời nhắn, chúng tôi sẽ email lại cho bạn.'}
                {activeModal === 'guide' && !selectedGuide && 'Các chủ đề phổ biến người dùng thường quan tâm.'}
                {activeModal === 'phone' && 'Chúng tôi luôn sẵn sàng lắng nghe bạn qua hotline dưới đây.'}
              </p>
              
              {activeModal === 'guide' ? (
                selectedGuide ? (
                  <div className={styles.guideDetailContainer}>
                    {guideContents[selectedGuide].content}
                    <button className={styles.backGuideBtn} onClick={() => setSelectedGuide(null)}>
                      Quay lại danh sách
                    </button>
                  </div>
                ) : (
                  <div className={styles.guideList}>
                    <div className={styles.guideItem} onClick={() => setSelectedGuide('start')}><FileText size={16}/> Cách bắt đầu cuộc trò chuyện đầu tiên</div>
                    <div className={styles.guideItem} onClick={() => setSelectedGuide('search')}><FileText size={16}/> Hướng dẫn tìm kiếm văn bản luật nhanh</div>
                    <div className={styles.guideItem} onClick={() => setSelectedGuide('history')}><FileText size={16}/> Quản lý lịch sử và tài liệu đã lưu</div>
                    <div className={styles.guideItem} onClick={() => setSelectedGuide('prompt')}><FileText size={16}/> Cách đặt câu hỏi để AI trả lời chính xác nhất</div>
                  </div>
                )
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
                  <input 
                    type="text" 
                    placeholder="Họ và tên" 
                    required 
                    className={styles.modalInput} 
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                  />
                  <input 
                    type="email" 
                    placeholder="Email liên hệ" 
                    required 
                    className={styles.modalInput} 
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                  />
                  <textarea 
                    placeholder="Nội dung phản hồi hoặc câu hỏi chi tiết..." 
                    required 
                    className={styles.modalTextarea}
                    value={emailMsg}
                    onChange={(e) => setEmailMsg(e.target.value)}
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
