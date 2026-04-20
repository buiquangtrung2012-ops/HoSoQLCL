import React from 'react';
import { Sparkles, Calendar, MapPin, Zap, Info } from 'lucide-react';

const FormField = ({ label, children, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    {children}
  </div>
);

const TaskBasicInfo = ({ task, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField label="Hạng mục thi công">
      <div className="relative group">
        <select 
          value={task.category} 
          onChange={(e) => onChange({...task, category: e.target.value})}
          className="field-input h-12 appearance-none pr-10 font-bold text-slate-800"
        >
          <option>Lắp đặt Trụ đèn</option>
          <option>Kéo Cáp ngầm</option>
          <option>Lắp Đèn/Cần đèn</option>
          <option>Hệ thống Tiếp địa</option>
          <option>Tủ điều khiển</option>
        </select>
        <Zap className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-amber-500 transition-colors" size={16} />
      </div>
    </FormField>

    <FormField label="Vị trí lắp đặt">
      <div className="relative">
        <input 
          type="text" 
          value={task.location} 
          onChange={(e) => onChange({...task, location: e.target.value})}
          className="field-input h-12 pl-10 font-bold"
          placeholder="VD: Tuyến đường A, Cột số 05..."
        />
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
      </div>
    </FormField>
  </div>
);

const TaskTimeline = ({ task, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField label="Ngày khởi công">
      <div className="relative">
        <input 
          type="date" 
          value={task.start_date} 
          onChange={(e) => onChange({...task, start_date: e.target.value})}
          className="field-input h-12 pl-10" 
        />
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
      </div>
    </FormField>

    <FormField label="Ngày nghiệm thu">
      <div className="relative">
        <input 
          type="date" 
          value={task.inspection_date} 
          onChange={(e) => onChange({...task, inspection_date: e.target.value})}
          className="field-input h-12 pl-10" 
        />
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
      </div>
    </FormField>
  </div>
);

const TaskTechnicalInfo = ({ task, onChange, onAISuggest, isLoadingAI }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center mb-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu chuẩn kỹ thuật áp dụng</label>
      <button 
        onClick={onAISuggest}
        disabled={isLoadingAI}
        className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[9px] font-black rounded-full hover:shadow-lg transition-all uppercase disabled:opacity-50"
      >
        <Sparkles size={11} /> AI Suggest TCVN Điện
      </button>
    </div>
    
    <div className="relative">
      <textarea 
        rows="4" 
        value={task.standards}
        onChange={(e) => onChange({...task, standards: e.target.value})}
        className="field-input w-full leading-relaxed min-h-[140px] p-5 text-sm font-semibold italic"
        placeholder="Chọn AI Suggest để tìm TCVN 7722, TCVN 110, TCVN 9206..."
      />
      {isLoadingAI && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-20">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] font-black text-indigo-600 tracking-[0.2em] uppercase">Đang tra cứu chuyên ngành Điện...</span>
          </div>
        </div>
      )}
    </div>
    
    <div className="p-4 bg-indigo-50 border border-indigo-100/50 rounded-2xl flex items-center gap-3">
       <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
          <Info size={16} className="text-white" />
       </div>
       <p className="text-[10px] text-indigo-700 leading-tight font-bold">
          Lưu ý: Luôn kiểm tra các tiêu chuẩn đo điện trở tiếp đất và độ cách điện cáp theo TCVN mới nhất.
       </p>
    </div>
  </div>
);

export { TaskBasicInfo, TaskTimeline, TaskTechnicalInfo };
