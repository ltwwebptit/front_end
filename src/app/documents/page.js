"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './documents.module.css';
import { Search, Filter, ChevronDown, Calendar, FileText, ChevronRight, ChevronLeft, Building, Scale } from 'lucide-react';

// Dummy legal data
const legalDocs = [
  { id: 1, number: '59/2020/QH14', title: 'Luật Doanh nghiệp 2020', agency: 'Quốc hội', date: '17/06/2020', type: 'Luật', status: 'Còn hiệu lực' },
  { id: 2, number: '45/2019/QH14', title: 'Bộ luật Lao động 2019', agency: 'Quốc hội', date: '20/11/2019', type: 'Bộ luật', status: 'Còn hiệu lực' },
  { id: 3, number: '15/2022/NĐ-CP', title: 'Quy định chính sách miễn, giảm thuế', agency: 'Chính phủ', date: '28/01/2022', type: 'Nghị định', status: 'Còn hiệu lực' },
  { id: 4, number: '100/2019/NĐ-CP', title: 'Xử phạt vi phạm hành chính trong lĩnh vực giao thông', agency: 'Chính phủ', date: '30/12/2019', type: 'Nghị định', status: 'Còn hiệu lực' },
  { id: 5, number: '91/2015/QH13', title: 'Bộ luật Dân sự 2015', agency: 'Quốc hội', date: '24/11/2015', type: 'Bộ luật', status: 'Còn hiệu lực' },
  { id: 6, number: '01/2021/TT-BKHĐT', title: 'Hướng dẫn về đăng ký doanh nghiệp', agency: 'Bộ KH&ĐT', date: '16/03/2021', type: 'Thông tư', status: 'Còn hiệu lực' },
  { id: 7, number: '68/2014/QH13', title: 'Luật Doanh nghiệp 2014', agency: 'Quốc hội', date: '26/11/2014', type: 'Luật', status: 'Hết hiệu lực' },
  { id: 8, number: '14/2019/TT-BCA', title: 'Quy định về vũ khí, vật liệu nổ', agency: 'Bộ Công an', date: '15/05/2019', type: 'Thông tư', status: 'Còn hiệu lực' },
];

export default function DocumentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [agencyFilter, setAgencyFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const itemsPerPage = 5;

  // Search & Filter logic
  const filteredDocs = legalDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency = !agencyFilter || doc.agency === agencyFilter;
    const matchesType = !typeFilter || doc.type === typeFilter;
    const matchesYear = !yearFilter || doc.date.includes(yearFilter);
    
    return matchesSearch && matchesAgency && matchesType && matchesYear;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
                onChange={handleSearchChange}
              />
              <button className={styles.searchBtn}>Tìm kiếm văn bản</button>
            </div>

            {/* Filters */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}><Filter size={16}/> Lọc nâng cao:</div>
              
              <div className={styles.filterItem}>
                <Building size={14} className={styles.dropdownIcon} />
                <select 
                  className={styles.filterSelect}
                  value={agencyFilter}
                  onChange={(e) => { setAgencyFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Cơ quan ban hành</option>
                  <option value="Quốc hội">Quốc hội</option>
                  <option value="Chính phủ">Chính phủ</option>
                  <option value="Bộ KH&ĐT">Bộ KH&ĐT</option>
                  <option value="Bộ Công an">Bộ Công an</option>
                </select>
              </div>

              <div className={styles.filterItem}>
                <FileText size={14} className={styles.dropdownIcon} />
                <select 
                  className={styles.filterSelect}
                  value={typeFilter}
                  onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Loại văn bản</option>
                  <option value="Luật">Luật</option>
                  <option value="Bộ luật">Bộ luật</option>
                  <option value="Nghị định">Nghị định</option>
                  <option value="Thông tư">Thông tư</option>
                </select>
              </div>

              <div className={styles.filterItem}>
                <Calendar size={14} className={styles.dropdownIcon} />
                <select 
                  className={styles.filterSelect}
                  value={yearFilter}
                  onChange={(e) => { setYearFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Năm ban hành</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeaderWrapper}>
              <div className={styles.tableStats}>Tìm thấy <strong>{filteredDocs.length}</strong> văn bản</div>
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
                  {currentDocs.length > 0 ? (
                    currentDocs.map((doc) => (
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

            {/* Pagination */}
            {totalPages > 0 && (
              <div className={styles.pagination}>
                <button 
                  className={styles.pageBtn} 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i + 1}
                    className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.pageActive : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  className={styles.pageBtn} 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
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
