import React from 'react';
import { Badge, Button } from '../ui/Common';
import { 
  History, Trash2, Download, Save, 
  MapPin, Zap, Clock, Info, ShieldCheck, ChevronRight
} from 'lucide-react';

const TaskHeaderCard = ({ task, onExport, onSave, onDelete }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/50 mb-6 flex justify-between items-center animate-fade-in">
      <div className="flex-1">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
          {task.name || 'Đang thiết lập công tác...'}
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="py-1 px-3 bg-indigo-50 text-indigo-600 border border-indigo-100">
            {task.category || 'Điện chiếu sáng'}
          </Badge>
          <Badge variant="warning" className="py-1 px-3 bg-amber-50 text-amber-600 border border-amber-100">
             Chưa nghiệm thu
          </Badge>
          <span className="text-[10px] text-slate-400 font-bold ml-2">Mã số: BB-{task.id} / 20-04-2026</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <div className="flex border border-slate-200 rounded-full overflow-hidden">
           <button 
             onClick={onExport}
             className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 hover:bg-slate-50 transition-all text-[11px] font-black uppercase tracking-wider"
           >
             <Download size={15} /> Export
           </button>
           <div className="w-[1px] bg-slate-200"></div>
           <button className="px-2 bg-white hover:bg-slate-50 border-none transition-all">
             <ChevronRight size={14} className="rotate-90 text-slate-400" />
           </button>
        </div>
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-[11px] font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95 uppercase tracking-wider"
        >
          <Save size={15} /> Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

const FormCard = ({ title, icon: Icon, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/50 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
              {Icon && <Icon size={18} />}
            </div>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</h3>
          </div>
          <button className="text-slate-200 hover:text-slate-400">...</button>
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export { TaskHeaderCard, FormCard };
