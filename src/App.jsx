import React, { useState, useEffect } from 'react';

/**
 * Component AppStyles chứa tất cả CSS
 */
const AppStyles = () => (
  <style>{`
    /* --- Cài đặt cơ bản --- */
    body {
      margin: 0;
      font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      background-color: #f3f4f6; 
      color: #111827;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .app-container {
      width: 100%;
      max-width: 42rem;
      margin: 1rem;
      background-color: #ffffff;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); 
      padding: 1.5rem;
    }

    .app-title {
      font-size: 1.875rem;
      font-weight: 700;
      text-align: center;
      color: #2563eb;
      margin-bottom: 2rem;
    }

    .app-section {
        margin-bottom: 1.5rem;
    }

    .app-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .app-textarea, .app-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }
    .app-textarea::placeholder, .app-input::placeholder {
      color: #9ca3af;
    }
    .app-textarea:focus, .app-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    .app-button {
      width: 100%;
      padding: 0.75rem;
      margin-top: 0.75rem;
      color: #ffffff;
      background-color: #3b82f6;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .app-button:hover {
      background-color: #2563eb;
    }
    
    .app-button-reset {
      background-color: #6b7280;
      margin-top: 1.5rem;
    }
    .app-button-reset:hover {
      background-color: #4b5563;
    }

    /* --- Khu vực hiển thị kết quả xổ số --- */
    .lottery-result-box {
        background-color: #ecfdf5;
        border: 1px solid #10b981;
        border-radius: 0.5rem;
        padding: 0.75rem;
        margin-top: 0.75rem;
        font-size: 0.9rem;
    }
    
    .lottery-header {
        display: flex;
        gap: 1.5rem;
        border-bottom: 1px dashed #059669;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .lottery-item {
        display: flex;
        align-items: baseline;
    }

    .lottery-item-row {
        margin-bottom: 0.25rem;
    }

    .lottery-label {
        font-weight: 700;
        color: #047857;
        margin-right: 0.5rem;
        white-space: nowrap;
    }
    
    .lottery-value {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-weight: 600;
        color: #111827;
        word-break: break-word;
    }

    /* --- Khu vực hiển thị chi tiết trúng (Mới) --- */
    .winning-details-box {
        margin-top: 1rem;
        border: 1px solid #fca5a5;
        background-color: #fef2f2;
        border-radius: 0.5rem;
        padding: 0.75rem;
    }
    .winning-title {
        color: #b91c1c;
        font-weight: 700;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        display: block;
        border-bottom: 1px solid #fecaca;
        padding-bottom: 0.25rem;
    }
    .winning-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .winning-item {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        padding: 0.25rem 0;
        border-bottom: 1px dashed #fecaca;
    }
    .winning-item:last-child {
        border-bottom: none;
    }

    /* --- Khu vực kết quả Tài chính --- */
    .results-container {
      margin-top: 2rem;
      border-top: 1px solid #e5e7eb;
      padding-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .results-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.125rem;
    }
    
    .results-label {
      color: #4b5563;
      font-weight: 500;
    }
    
    .results-value {
      font-weight: 700;
      font-size: 1.5rem;
    }
    
    .results-income { color: #16a34a; }
    .results-expense { color: #dc2626; }
    
    .results-balance-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.125rem;
      background-color: #eff6ff;
      padding: 1rem;
      border-radius: 0.5rem;
    }
    
    .results-balance-label {
      color: #1e40af;
      font-weight: 700;
    }
    
    .results-balance-value {
      font-weight: 700;
      font-size: 1.875rem;
      color: #1d4ed8;
    }
    
    .results-balance-value.negative { color: #dc2626; }

  `}</style>
);

const formatCurrency = (value) => {
  if (isNaN(value)) value = 0;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const parseAmount = (amountStr) => {
  if (!amountStr) return 0;
  const normalizedStr = amountStr.toLowerCase().replace('n', 'k');
  let value = 0;
  const numericPart = parseFloat(normalizedStr);
  if (isNaN(numericPart)) return 0;
  if (normalizedStr.includes('k')) {
    value = numericPart * 1000;
  } else {
    value = numericPart;
  }
  return value;
};


export default function App() {
  const [thuInput, setThuInput] = useState(''); 
  const [kqInput, setKqInput] = useState(''); 
  
  // State Tài chính
  const [tongThuKhach, setTongThuKhach] = useState(0);    
  const [tongThuVe, setTongThuVe] = useState(0);          
  const [tongChi, setTongChi] = useState(0);             
  const [tonLai, setTonLai] = useState(0);       

  // State tách kết quả xổ số
  const [ketQuaTach, setKetQuaTach] = useState({ bc: '', de: '', lo: [] });
  
  // State hiển thị chi tiết trúng (MỚI)
  const [chiTietTrung, setChiTietTrung] = useState([]);

  // Giá trị cơ bản 1đ Lô
  const LO_BASE_VALUE = 23000;

  useEffect(() => {
    setTonLai(tongThuVe - tongChi);
  }, [tongThuVe, tongChi]);

  // --- Logic Tách Kết Quả Xổ Số ---
  useEffect(() => {
    if (!kqInput.trim()) {
      setKetQuaTach({ bc: '', de: '', lo: [] });
      return;
    }

    let rawStr = kqInput.toUpperCase();
    rawStr = rawStr.replace(/(?:G\.?[\s]*ĐB|ĐẶC\s*BIỆT|ĐB|DB)/g, '||DB');
    rawStr = rawStr.replace(/G\.?[\s]*1/g, '||G1');
    rawStr = rawStr.replace(/G\.?[\s]*2/g, '||G2');
    rawStr = rawStr.replace(/G\.?[\s]*3/g, '||G3');
    rawStr = rawStr.replace(/G\.?[\s]*4/g, '||G4');
    rawStr = rawStr.replace(/G\.?[\s]*5/g, '||G5');
    rawStr = rawStr.replace(/G\.?[\s]*6/g, '||G6');
    rawStr = rawStr.replace(/G\.?[\s]*7/g, '||G7');

    const segments = rawStr.split('||');
    let bcResult = '';
    let deResult = '';
    let loResult = [];

    const rules = {
      'G1': { count: 1, len: 5 },
      'G2': { count: 2, len: 5 },
      'G3': { count: 6, len: 5 },
      'G4': { count: 4, len: 4 },
      'G5': { count: 6, len: 4 },
      'G6': { count: 3, len: 3 },
      'G7': { count: 4, len: 2 },
    };

    segments.forEach(seg => {
      let currentType = null;
      if (seg.startsWith('DB')) currentType = 'DB';
      else if (seg.startsWith('G1')) currentType = 'G1';
      else if (seg.startsWith('G2')) currentType = 'G2';
      else if (seg.startsWith('G3')) currentType = 'G3';
      else if (seg.startsWith('G4')) currentType = 'G4';
      else if (seg.startsWith('G5')) currentType = 'G5';
      else if (seg.startsWith('G6')) currentType = 'G6';
      else if (seg.startsWith('G7')) currentType = 'G7';

      if (!currentType) return;

      const digitsOnly = seg.substring(currentType.length).replace(/\D/g, '');

      if (currentType === 'DB') {
        if (digitsOnly.length >= 5) {
          const num = digitsOnly.substring(0, 5);
          bcResult = num.slice(-3);
          deResult = num.slice(-2);
        }
      } else {
        const rule = rules[currentType];
        if (rule) {
          for (let i = 0; i < rule.count; i++) {
            const start = i * rule.len;
            const end = start + rule.len;
            if (digitsOnly.length >= end) {
              const fullNum = digitsOnly.substring(start, end);
              loResult.push(fullNum.slice(-2));
            }
          }
        }
      }
    });
    setKetQuaTach({ bc: bcResult, de: deResult, lo: loResult });
  }, [kqInput]);


  // --- Helper: Phân tích số Đề (Đầu, Đít, Đầu Đít, 3 số đảo) ---
  const phanTichSoDe = (chuoiSo) => {
    let ketQua = [];
    let processedStr = chuoiSo.toLowerCase();

    // 1. Xử lý "Đầu Đít N" (vd: đầu đít 1)
    // Regex: tìm chữ "đầu đít" hoặc "đđ" sau đó là số
    const dauDitRegex = /(?:(?:đầu|dau|dâu|dầu|dầu|dàu|đau)\s*(?:đít|đit|dit|dít)|đđ|dd)\s*(\d)/gi;
    let match;
    while ((match = dauDitRegex.exec(processedStr)) !== null) {
        const digit = parseInt(match[1]);
        // Thêm đầu (10 - 19)
        for(let i=0; i<10; i++) ketQua.push(`${digit}${i}`);
        // Thêm đít (01 - 91), trừ đi số kép đã thêm ở vòng lặp trên
        for(let i=0; i<10; i++) {
            if (i !== digit) ketQua.push(`${i}${digit}`);
        }
        // Xóa đoạn text đã xử lý để không bị trùng lặp khi quét số thường
        processedStr = processedStr.replace(match[0], ' '); 
    }
    // Xóa cụm từ khóa trong string sau khi xử lý xong (để clean code phía dưới sạch hơn)
    processedStr = processedStr.replace(/(?:đầu\s*đít|đđ)/g, ' '); 

    // 2. Xử lý "Đầu N"
    const dauRegex = /(?:đầu|dau|dâu|dầu|dầu|dàu|đau)\s*(\d)/gi;
    while ((match = dauRegex.exec(processedStr)) !== null) {
        const digit = match[1];
        for(let i=0; i<10; i++) ketQua.push(`${digit}${i}`);
    }
    processedStr = processedStr.replace(/đầu/g, ' ');

    // 3. Xử lý "Đít N" (hoặc đuôi)
    const ditRegex = /(?:đít|đit|dit|dít|đuôi|duoi)\s*(\d)/gi;
    while ((match = ditRegex.exec(processedStr)) !== null) {
        const digit = match[1];
        for(let i=0; i<10; i++) ketQua.push(`${i}${digit}`);
    }
    processedStr = processedStr.replace(/(?:đít|đuôi)/g, ' ');

    // 4. Xử lý các số còn lại (Số thường 2 chữ số và Số gánh 3 chữ số)
    // Xóa hết các ký tự không phải số, dấu phẩy, khoảng trắng
    const cleanNumbers = processedStr.replace(/[^\d\s,]/g, ' ');
    const tokens = cleanNumbers.match(/\d+/g);
    
    if (tokens) {
        tokens.forEach(t => {
            if (t.length === 3) {
                // Logic: 151 -> 15 và 51
                ketQua.push(t.substring(0, 2));
                ketQua.push(t.substring(1, 3));
            } else if (t.length === 2) {
                ketQua.push(t);
            }
        });
    }

    return ketQua;
  };


  /**
   * Xử lý tính toán
   */
  const handleCalculate = () => {
    let totalIncomeFromUser = 0;
    let totalRealIncome = 0;
    let totalExpense = 0; 
    let listWin = []; // Danh sách trúng tạm thời

    // Tách các cụm tin nhắn dựa vào dấu "x" (ví dụ x100k)
    const parts = thuInput.split(/(x\d+[knđd])/i);

    for (let i = 0; i < parts.length - 1; i += 2) {
      const numberString = parts[i];          
      const amountStringWithX = parts[i + 1]; 

      // 1. Lấy giá trị tiền
      const amountStr = amountStringWithX.substring(1); 
      const amountValue = parseAmount(amountStr);       
      
      const lowerCaseNumberString = numberString.toLowerCase();

      // --- PHÂN LOẠI ---

      // --- 1. ĐỀ (Xử lý Logic mới ở đây) ---
      // Ưu tiên check Đề trước nếu có từ khóa hoặc mặc định
      if (/[d]|đ|đê|đề|dê|đe/.test(lowerCaseNumberString) && !/[l]|lô|lo/.test(lowerCaseNumberString)) {
        
        // Gọi hàm phân tích mới để lấy toàn bộ danh sách số Đề
        const listDe = phanTichSoDe(numberString);
        const count = listDe.length;

        if (count > 0 && amountValue > 0) {
            // Thu
            const incomeReal = amountValue * count * 0.81;
            const incomeUser = amountValue * count;
            totalRealIncome += incomeReal;
            totalIncomeFromUser += incomeUser;

            // Chi (1 ăn 80)
            listDe.forEach(num => {
                if (ketQuaTach.de && num === ketQuaTach.de) {
                    const winMoney = amountValue * 80;
                    totalExpense += winMoney;
                    // Thêm vào danh sách hiển thị
                    listWin.push({
                        type: 'Đề',
                        num: num,
                        amount: winMoney
                    });
                }
            });
        }

      // --- 2. LÔ ---
      } else if (/[l]|lô|lo/.test(lowerCaseNumberString)) {
        // Vẫn dùng logic cũ cho Lô (chỉ lấy số thường)
        const cleanStr = numberString.replace(/[l]|lô|lo|[x]|xi|xiên/gi, ' ');
        const foundNumbers = cleanStr.match(/\d+/g);
        const count = foundNumbers ? foundNumbers.length : 0;

        if (count > 0 && amountValue > 0) {
             // Thu
            const incomeReal = LO_BASE_VALUE * amountValue * count * 21.7 / 23;
            const incomeUser = LO_BASE_VALUE * amountValue * count;
            totalRealIncome += incomeReal;
            totalIncomeFromUser += incomeUser;

            // Chi
            foundNumbers.forEach(num => {
                const timesAppeared = ketQuaTach.lo.filter(res => res === num).length;
                if (timesAppeared > 0) {
                    const winMoney = amountValue * 80000 * timesAppeared;
                    totalExpense += winMoney;
                    listWin.push({
                        type: `Lô (${timesAppeared} nháy)`,
                        num: num,
                        amount: winMoney
                    });
                }
            });
        }

      // --- 3. BA CÀNG ---
      } else if (/[bc]|bacang|3cang|baca|bacan|ba càng/.test(lowerCaseNumberString)) {
        const cleanStr = numberString.replace(/[bc]|bacang|3cang|baca|bacan|ba càng/gi, ' ');
        const foundNumbers = cleanStr.match(/\d+/g);
        const count = foundNumbers ? foundNumbers.length : 0;

        if (count > 0 && amountValue > 0) {
            totalRealIncome += amountValue * count * 0.81;
            totalIncomeFromUser += amountValue * count;

            foundNumbers.forEach(num => {
                if (ketQuaTach.bc && num === ketQuaTach.bc) {
                    const winMoney = amountValue * 400;
                    totalExpense += winMoney;
                    listWin.push({
                        type: '3 Càng',
                        num: num,
                        amount: winMoney
                    });
                }
            });
        }

      // --- 4. XIÊN ---
      } else if (/x2|xienhai|xhai|xiên hai|xien2|xihai|x3|xienba|xba|xiên ba|xien3|xiba|x4|xienbon|xbon|xiên bốn|xien4|xibon/.test(lowerCaseNumberString)) {
        // Logic tách số xiên vẫn giữ nguyên đơn giản
        const cleanStr = numberString.replace(/x2|xienhai|xhai|xiên hai|xien2|xihai|x3|xienba|xba|xiên ba|xien3|xiba|x4|xienbon|xbon|xiên bốn|xien4|xibon/gi, ' ');
        const foundNumbers = cleanStr.match(/\d+/g);
        const count = foundNumbers ? foundNumbers.length : 0;
        
        if (count > 0 && amountValue > 0) {
             // Phân loại xiên mấy
             if (/x2|xienhai|xhai|xiên hai|xien2|xihai/.test(lowerCaseNumberString)) {
                // Xiên 2
                const pairsCount = Math.floor(count / 2);
                totalRealIncome += amountValue * pairsCount * 0.65;
                totalIncomeFromUser += amountValue * pairsCount;
                
                for (let j = 0; j < foundNumbers.length; j += 2) {
                    const pair = foundNumbers.slice(j, j + 2);
                    if (pair.length === 2) {
                        const hasNum1 = ketQuaTach.lo.includes(pair[0]);
                        const hasNum2 = ketQuaTach.lo.includes(pair[1]);
                        if (hasNum1 && hasNum2) {
                            const winMoney = amountValue * 10;
                            totalExpense += winMoney;
                            listWin.push({ type: 'Xiên 2', num: pair.join('-'), amount: winMoney });
                        }
                    }
                }
             } else if (/x3|xienba|xba|xiên ba|xien3|xiba/.test(lowerCaseNumberString)) {
                // Xiên 3
                const tripsCount = Math.floor(count / 3);
                totalRealIncome += amountValue * tripsCount * 0.65;
                totalIncomeFromUser += amountValue * tripsCount;

                for (let j = 0; j < foundNumbers.length; j += 3) {
                    const triplet = foundNumbers.slice(j, j + 3);
                    if (triplet.length === 3) {
                         const hasNum1 = ketQuaTach.lo.includes(triplet[0]);
                         const hasNum2 = ketQuaTach.lo.includes(triplet[1]);
                         const hasNum3 = ketQuaTach.lo.includes(triplet[2]);
                         if (hasNum1 && hasNum2 && hasNum3) {
                             const winMoney = amountValue * 40;
                             totalExpense += winMoney;
                             listWin.push({ type: 'Xiên 3', num: triplet.join('-'), amount: winMoney });
                         }
                    }
                }
             } else {
                 // Xiên 4
                const quadsCount = Math.floor(count / 4);
                totalRealIncome += amountValue * quadsCount * 0.65;
                totalIncomeFromUser += amountValue * quadsCount;

                for (let j = 0; j < foundNumbers.length; j += 4) {
                    const quad = foundNumbers.slice(j, j + 4);
                    if (quad.length === 4) {
                         const hasNum1 = ketQuaTach.lo.includes(quad[0]);
                         const hasNum2 = ketQuaTach.lo.includes(quad[1]);
                         const hasNum3 = ketQuaTach.lo.includes(quad[2]);
                         const hasNum4 = ketQuaTach.lo.includes(quad[3]);
                         if (hasNum1 && hasNum2 && hasNum3 && hasNum4) {
                             const winMoney = amountValue * 100;
                             totalExpense += winMoney;
                             listWin.push({ type: 'Xiên 4', num: quad.join('-'), amount: winMoney });
                         }
                    }
                }
             }
        }
      }
    }

    setTongThuKhach(totalIncomeFromUser);
    setTongThuVe(totalRealIncome);
    setTongChi(totalExpense); 
    setChiTietTrung(listWin); // Cập nhật danh sách trúng
  };


  const handleReset = () => {
    setThuInput('');
    setKqInput(''); 
    setTongThuKhach(0);
    setTongThuVe(0);
    setTongChi(0);
    setTonLai(0);
    setKetQuaTach({ bc: '', de: '', lo: [] });
    setChiTietTrung([]);
  };

  return (
    <>
      <AppStyles /> 
      
      <div className="app-container">
        <h1 className="app-title">
          Tính Toán Thu Chi
        </h1>

        <div className="app-section">
          {/* 1. Phần Nhập "Thu" */}
          <div className="app-section">
            <label htmlFor="thuInput" className="app-label">
              1. Nhập chuỗi TỔNG THU (Tin nhắn khách)
            </label>
            <textarea
              id="thuInput"
              rows="4"
              className="app-textarea"
              placeholder='Ví dụ: đ đầu 1, đít 5 x100k, đ 151 x50k, Lô 24 x10d'
              value={thuInput}
              onChange={(e) => setThuInput(e.target.value)}
            />
            <button
                onClick={handleCalculate}
                className="app-button"
            >
                Tính Toán
            </button>
          </div>

          {/* 2. Phần Nhập "Kết Quả" */}
          <div className="app-section">
            <label htmlFor="kqInput" className="app-label">
              2. Nhập KẾT QUẢ HÀNG NGÀY (Để tính chi)
            </label>
            <textarea
              id="kqInput"
              rows="5"
              className="app-textarea"
              placeholder='Copy paste kết quả vào đây (G.ĐB69897G.199665...)'
              value={kqInput}
              onChange={(e) => setKqInput(e.target.value)}
            />
            
            {/* Hiển thị kết quả tách được (BC, Đ, L) */}
            {(ketQuaTach.bc || ketQuaTach.de || ketQuaTach.lo.length > 0) && (
                <>
                    <div className="lottery-result-box">
                        <div className="lottery-header">
                            {ketQuaTach.bc && (
                                <div className="lottery-item">
                                    <span className="lottery-label">bc:</span> 
                                    <span className="lottery-value">{ketQuaTach.bc}</span>
                                </div>
                            )}
                            {ketQuaTach.de && (
                                <div className="lottery-item">
                                    <span className="lottery-label">đ:</span> 
                                    <span className="lottery-value">{ketQuaTach.de}</span>
                                </div>
                            )}
                        </div>
                        
                        {ketQuaTach.lo.length > 0 && (
                            <div className="lottery-item-row">
                                <span className="lottery-label">l ({ketQuaTach.lo.length} số):</span>
                                <span className="lottery-value" style={{lineHeight: '1.5'}}>
                                    {ketQuaTach.lo.join(', ')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* --- HIỂN THỊ CHI TIẾT TRÚNG (MỚI) --- */}
                    {chiTietTrung.length > 0 && (
                        <div className="winning-details-box">
                            <span className="winning-title">Chi Tiết Trúng Thưởng:</span>
                            <ul className="winning-list">
                                {chiTietTrung.map((item, index) => (
                                    <li key={index} className="winning-item">
                                        <span>
                                            <strong>{item.type}</strong> số <strong>{item.num}</strong>
                                        </span>
                                        <span style={{color: '#dc2626', fontWeight: 'bold'}}>
                                            {formatCurrency(item.amount)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
          </div>

          {/* 4. Kết Quả Tài Chính */}
          <div className="results-container">
            <div className="results-row">
              <span className="results-label">Tổng Thu Khách:</span>
              <span className="results-value results-income">
                {formatCurrency(tongThuKhach)}
              </span>
            </div>
            <div className="results-row">
              <span className="results-label">Tổng Thu Về (Đã cắt phế):</span>
              <span className="results-value results-income" style={{color: '#059669'}}> 
                {formatCurrency(tongThuVe)}
              </span>
            </div>
            <div className="results-row">
              <span className="results-label">Tổng Chi (Trả khách trúng):</span>
              <span className="results-value results-expense">
                {formatCurrency(tongChi)}
              </span>
            </div>
            
            <hr style={{margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb'}} />

            <div className="results-balance-row">
              <span className="results-balance-label">Tồn Lại:</span>
              <span className={`results-balance-value ${tonLai < 0 ? 'negative' : ''}`}>
                {formatCurrency(tonLai)}
              </span>
            </div>
          </div>
          
          <button onClick={handleReset} className="app-button app-button-reset">
            Làm Mới Toàn Bộ
          </button>

        </div>
      </div>
    </>
  );
}