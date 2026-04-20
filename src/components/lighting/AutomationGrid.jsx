import React from 'react';
import { Badge, Button } from '../ui/Common';
import { 
  Zap, CheckCircle2, ShieldCheck, 
  FileText, ArrowDownToLine, Star
} from 'lucide-react';

const AutomationGrid = ({ task, onExportAll }) => {
  const isCabling = task.name?.toLowerCase().includes('cáp');
  const isMast = task.name?.toLowerCase().includes('trụ') || task.name?.toLowerCase().includes('móng');
  
  const documents = [
    { id: 'bbnt', label: 'Nghiệm thu Công việc', desc: 'Danh mục kỹ thuật công tác', required: true, checked: true },
    { id: 'bbvl', label: 'Nghiệm thu Vật liệu', desc: 'Chất lượng vật tư đầu vào', required: true, checked: !!task.standards },
    { id: 'bbem', label: 'Thí nghiệm Điện/Độ rọi', desc: 'Đo lường thông số kỹ thuật', required: isCabling, checked: isCabling, priority: true },
    { id: 'ntct', label: 'Nhật ký thi công', desc: 'Tiến độ và thực tế triển khai', required: true, checked: true },
  ];

  return (
    <div className="bg-white rounded-[1.5rem] p-8 shadow-md border border-slate-100/80 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
            <Zap size={22} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Tự động hóa Hồ sơ</h3>
            <p className="text-[11px] text-slate-400 font-medium">Hệ thống AI đang hỗ trợ kiểm soát chất lượng</p>
          </div>
        </div>
        <button className="text-slate-200">...</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {documents.map(doc => (
          <div 
            key={doc.id}
            className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all ${
              doc.checked 
              ? 'bg-white border-indigo-100 shadow-sm ring-1 ring-indigo-50/50' 
              : 'bg-slate-50/50 border-slate-100 opacity-60 grayscale'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                doc.checked ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
              }`}>
                {doc.checked ? <CheckCircle2 size={14} strokeWidth={3} /> : <FileText size={12} />}
              </div>
              <div>
                <p className={`text-[12px] font-black leading-tight mb-1 ${doc.checked ? 'text-slate-800' : 'text-slate-400'}`}>
                  {doc.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{doc.desc}</p>
              </div>
            </div>
            {doc.required && (
              <Badge variant={doc.priority ? 'success' : 'slate'} className="bg-indigo-50 text-indigo-600 border border-indigo-100 py-0.5 px-1.5 h-fit text-[8px]">
                {doc.priority ? 'ƯU TIÊN' : 'BẮT BUỘC'}
              </Badge>
            )}
          </div>
        ))}
      </div>
      
      {(isCabling || isMast) && (
         <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4 mb-8 animate-slide-in">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
               <Star size={20} fill="currentColor" />
            </div>
            <div>
               <p className="text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-0.5">Trình trợ lý Dự án Điện</p>
               <p className="text-[11px] text-emerald-600 leading-relaxed font-medium">
                  {isCabling ? 'Phát hiện công tác Kéo cáp: Tự động kích hoạt Biên bản đo cách điện và Biên bản đấu nối cáp.' : 'Phát hiện công tác Trụ đèn: Tự động kích hoạt Biên bản thử nghiệm chiếu sáng và Tiếp địa móng.'}
               </p>
            </div>
         </div>
      )}

      <button 
        onClick={onExportAll}
        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 group"
      >
        <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
        XUẤT TẤT CẢ HỒ SƠ DỰ ÁN (.DOCX)
      </button>
    </div>
  );
};

export { AutomationGrid };
