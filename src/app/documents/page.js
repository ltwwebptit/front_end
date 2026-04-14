"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './documents.module.css';
import { Search, Filter, ChevronDown, Calendar, FileText, ChevronRight, ChevronLeft, Building, Scale, MoreHorizontal } from 'lucide-react';

import { apiFetch } from '../../utils/api';

export default function DocumentsPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [agencyFilter, setAgencyFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0, number: 0 });

  useEffect(() => {
    fetchDocs(currentPage);
  }, [currentPage, agencyFilter, typeFilter, yearFilter]);

  const fetchDocs = async (page) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        size: 10
      });
      if (searchTerm) params.append('keyword', searchTerm);
      if (typeFilter) params.append('type', typeFilter);
      if (agencyFilter) params.append('agency', agencyFilter);
      if (yearFilter) params.append('year', yearFilter);

      const data = await apiFetch(`/api/legal-documents/search?${params.toString()}`, { method: "GET" });
      
      if (data) {
        setPageData({
          content: (data.content || []).map(d => ({
            ...d,
            number: d.title.split(' ')[0] || `Doc-${d.id}`,
            title: d.title,
            agency: d.issuingAgency,
            date: d.issueDate ? d.issueDate.split('T')[0] : '',
            type: d.type,
            status: d.status ? 'Còn hiệu lực' : 'Hết hiệu lực'
          })),
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          number: data.number
        });
      }
    } catch (err) {
      console.error("Lỗi tải văn bản:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setCurrentPage(0);
    fetchDocs(0);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < pageData.totalPages) {
      setCurrentPage(page);
    }
  };

  // Hàm tạo dãy nút hiển thị phân trang có dấu ...
  const generatePagination = () => {
    const current = pageData.number;
    const total = pageData.totalPages;
    if (total <= 7) return Array.from({ length: total }).map((_, i) => i);
    
    if (current <= 3) return [0, 1, 2, 3, 4, '...', total - 1];
    if (current >= total - 4) return [0, '...', total - 5, total - 4, total - 3, total - 2, total - 1];
    return [0, '...', current - 1, current, current + 1, '...', total - 1];
  };

  return (
    <div className={styles.docsContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
           <Scale size={20} className={styles.titleIcon} /> Kho Dữ Liệu Pháp Luật
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainWrapper}>
          
          {/* Search Section */}
          <div className={styles.searchSection}>
            <h1 className={styles.pageTitle}>Tra Cứu Gần 200,000 Văn Bản Pháp Quy</h1>
            <p className={styles.pageSubtitle}>Dữ liệu được cập nhật tự động từ hệ thống thông tin pháp luật Quốc gia.</p>
            
            <div className={styles.searchBarWrapper}>
              <Search className={styles.searchIcon} size={24} />
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Nhập tên văn bản, số hiệu, hoặc từ khóa (VD: Luật Doanh Nghiệp)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyPress}
              />
              <button className={styles.searchBtn} onClick={handleSearchClick}>Tìm kiếm văn bản</button>
            </div>

            {/* Filters */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}><Filter size={16}/> Lọc nâng cao:</div>
              
              <div className={styles.filterItem}>
                <Building size={14} className={styles.dropdownIcon} />
                <select 
                  className={styles.filterSelect}
                  value={agencyFilter}
                  onChange={(e) => { setAgencyFilter(e.target.value); setCurrentPage(0); }}
                >
                  <option value="">Cơ quan ban hành</option>
                  <option value="Quốc hội">Quốc hội</option>
                  <option value="Chính phủ">Chính phủ</option>
                  <option value="Bộ Tài chính">Bộ Tài chính</option>
                  <option value="Bộ Kế hoạch và Đầu tư">Bộ KH&ĐT</option>
                  <option value="Bộ Công an">Bộ Công an</option>
                </select>
              </div>

              <div className={styles.filterItem}>
                <FileText size={14} className={styles.dropdownIcon} />
                <select 
                  className={styles.filterSelect}
                  value={typeFilter}
                  onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(0); }}
                >
                  <option value="">Loại hình</option>
                  <option value="Luật">Luật</option>
                  <option value="Bộ luật">Bộ luật</option>
                  <option value="Nghị định">Nghị định</option>
                  <option value="Thông tư">Thông tư</option>
                  <option value="Quyết định">Quyết định</option>
                  <option value="Pháp lệnh">Pháp lệnh</option>
                </select>
              </div>

              <div className={styles.filterItem}>
                <Calendar size={14} className={styles.dropdownIcon} />
                <select 
                  className={styles.filterSelect}
                  value={yearFilter}
                  onChange={(e) => { setYearFilter(e.target.value); setCurrentPage(0); }}
                >
                  <option value="">Năm ban hành</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2015">2015</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeaderWrapper}>
              <div className={styles.tableStats}>Tìm thấy <strong>{pageData.totalElements}</strong> văn bản</div>
              <div className={styles.tableSort}>
                Sắp xếp theo: <strong>Mới nhất</strong> <ChevronDown size={14} />
              </div>
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.docTable}>
                <thead>
                  <tr>
                    <th>Số ký hiệu</th>
                    <th style={{ width: '40%' }}>Tên văn bản</th>
                    <th>Ngày ban hành</th>
                    <th>Cơ quan ban hành</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        Đang lấy dữ liệu từ máy chủ...
                      </td>
                    </tr>
                  ) : pageData.content.length > 0 ? (
                    pageData.content.map((doc) => (
                      <tr 
                        key={doc.id} 
                        className={styles.tableRow}
                        onClick={() => router.push(`/documents/${doc.id}`)}
                      >
                        <td className={styles.tdNumber}>{doc.number}</td>
                        <td className={styles.tdTitle}>
                          <div className={styles.docTypeBadge}>{doc.type}</div>
                          {doc.title}
                        </td>
                        <td className={styles.tdDate}>{doc.date}</td>
                        <td className={styles.tdAgency}>{doc.agency}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${doc.status === 'Hết hiệu lực' ? styles.statusExpired : styles.statusActive}`}>
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        Không tìm thấy văn bản pháp luật nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination UI with ellipsis avoiding millions of buttons */}
            {!loading && pageData.totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  className={styles.pageBtn} 
                  disabled={pageData.number === 0}
                  onClick={() => handlePageChange(pageData.number - 1)}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {generatePagination().map((val, idx) => (
                  val === '...' ? (
                    <span key={`ellipsis-${idx}`} style={{ padding: '0 8px', color: 'var(--text-muted)' }}><MoreHorizontal size={16}/></span>
                  ) : (
                    <button 
                      key={`page-${val}`}
                      className={`${styles.pageBtn} ${pageData.number === val ? styles.pageActive : ''}`}
                      onClick={() => handlePageChange(val)}
                    >
                      {val + 1}
                    </button>
                  )
                ))}
                
                <button 
                  className={styles.pageBtn} 
                  disabled={pageData.number >= pageData.totalPages - 1}
                  onClick={() => handlePageChange(pageData.number + 1)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
