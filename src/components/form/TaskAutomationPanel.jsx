import React, { useState } from 'react';
import { Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FormSection } from './FormComponents';

/**
 * TaskAutomationPanel Component
 * Section 4: Document automation checklist
 * Converts automation into interactive checklist UI with visual feedback
 */
const TaskAutomationPanel = ({ task, onDocumentToggle }) => {
  const isConcrete = task.category?.toLowerCase().includes('bê tông') || 
                     task.name?.toLowerCase().includes('bê tông');
  
  // Define documents based on task type
  const documents = [
    { 
      id: 'bbnt', 
      label: 'Biên bản Nghiệm thu Công việc', 
      description: 'Kiểm tra chất lượng hoàn thành',
      required: true, 
      checked: true 
    },
    { 
      id: 'bbvl', 
      label: 'Biên bản Nghiệm thu Vật liệu', 
      description: 'Xác nhận chất lượng vật liệu',
      required: true, 
      checked: !!task.standards 
    },
    { 
      id: 'bblm', 
      label: 'Biên bản Lấy mẫu Thí nghiệm', 
      description: 'Lấy mẫu để phân tích kỹ thuật',
      required: isConcrete, 
      checked: isConcrete && !!task.standards 
    },
    { 
      id: 'ntct', 
      label: 'Nhật ký thi công tự động', 
      description: 'Ghi chép quá trình thực hiện',
      required: true, 
      checked: true 
    },
  ];

  // Calculate completion
  const checkedCount = documents.filter(d => d.checked).length;
  const totalRequired = documents.filter(d => d.required).length;
  const completionPercent = Math.round((checkedCount / totalRequired) * 100);

  return (
    <FormSection 
      title="Tự động hóa hồ sơ"
      subtitle="Danh sách tài liệu cần chuẩn bị"
      icon={Zap}
      highlighted
    >
      {/* Progress Indicator */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50/60 rounded-lg">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">
              Tiến độ hoàn thành
            </span>
            <span className="text-[10px] font-bold text-indigo-700">
              {checkedCount}/{totalRequired}
            </span>
          </div>
          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {documents.map(doc => (
          <DocumentCheckbox 
            key={doc.id}
            doc={doc}
            onToggle={() => onDocumentToggle && onDocumentToggle(doc.id)}
          />
        ))}
      </div>

      {/* Status Alert */}
      {isConcrete && !!task.standards && (
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex items-start gap-3 animate-slide-in">
          <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center shrink-0 mt-0.5">
            <Zap size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-emerald-900 font-bold mb-1">
              ✓ Hệ thống tự động kích hoạt
            </p>
            <p className="text-[9px] text-emerald-800 leading-relaxed">
              Các tài liệu cho bê tông đã được kích hoạt: <strong>Biên bản lấy mẫu</strong> và <strong>Dữ liệu thí nghiệm</strong>
            </p>
          </div>
        </div>
      )}

      {/* Missing Info Alert */}
      {!task.standards && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
          <div className="w-6 h-6 bg-amber-600 rounded-md flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-amber-900 font-bold mb-1">
              ⚠ Chưa sẵn sàng xuất bản
            </p>
            <p className="text-[9px] text-amber-800 leading-relaxed">
              Cần hoàn thành <strong>Tiêu chuẩn kỹ thuật</strong> để tự động hóa các tài liệu
            </p>
          </div>
        </div>
      )}
    </FormSection>
  );
};

/**
 * DocumentCheckbox Component
 * Individual document checkbox item with enhanced UI
 */
const DocumentCheckbox = ({ doc, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-start gap-3 p-3.5 rounded-lg border-2 transition-all cursor-pointer text-left group ${
        doc.checked 
          ? 'bg-indigo-50 border-indigo-200 hover:border-indigo-300' 
          : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Checkbox */}
      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all mt-0.5 ${
        doc.checked 
          ? 'bg-indigo-600 text-white' 
          : 'bg-white border-2 border-slate-300 group-hover:border-indigo-400'
      }`}>
        {doc.checked && <CheckCircle2 size={16} />}
      </div>
      
      {/* Label & Description */}
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-bold leading-tight ${
          doc.checked ? 'text-slate-900' : 'text-slate-600'
        }`}>
          {doc.label}
        </div>
        <div className={`text-[9px] mt-1 ${
          doc.checked ? 'text-slate-600' : 'text-slate-500'
        }`}>
          {doc.description}
        </div>
      </div>
      
      {/* Required Badge */}
      {doc.required && (
        <span className="text-[8px] font-black text-rose-600 uppercase tracking-tighter bg-rose-50 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
          Bắt buộc
        </span>
      )}
    </button>
  );
};

export { TaskAutomationPanel, DocumentCheckbox };
