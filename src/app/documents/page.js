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
              />
              <button className={styles.searchBtn}>Tìm kiếm văn bản</button>
            </div>

            {/* Filters */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}><Filter size={16}/> Lọc nâng cao:</div>
              <div className={styles.filterDropdown}>
                <Building size={14} className={styles.dropdownIcon} />
                <span>Cơ quan ban hành</span>
                <ChevronDown size={14} />
              </div>
              <div className={styles.filterDropdown}>
                <FileText size={14} className={styles.dropdownIcon} />
                <span>Loại văn bản</span>
                <ChevronDown size={14} />
              </div>
              <div className={styles.filterDropdown}>
                <Calendar size={14} className={styles.dropdownIcon} />
                <span>Năm ban hành</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeaderWrapper}>
              <div className={styles.tableStats}>Tìm thấy <strong>12,450</strong> văn bản</div>
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
                  {legalDocs.map((doc) => (
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button className={styles.pageBtn} disabled><ChevronLeft size={16} /></button>
              <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <span className={styles.pageDots}>...</span>
              <button className={styles.pageBtn}>1245</button>
              <button className={styles.pageBtn}><ChevronRight size={16} /></button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
