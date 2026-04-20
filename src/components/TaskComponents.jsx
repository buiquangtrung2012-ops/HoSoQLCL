import React from 'react';
import { Badge, Button } from './ui/Common';
import { Trash2, AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

/**
 * TaskListItem Component (Refactored)
 * Improved visual hierarchy with:
 * - Color-coded category badges
 * - Clear status indicators (Pending/Completed/Missing documents)
 * - Hover actions (edit/delete)
 * - Better visual feedback when selected
 */
const TaskListItem = ({ task, isActive, onClick, onDelete }) => {
  // Determine status with icon and color
  const getStatusInfo = (task) => {
    if (!task.standards) {
      return { 
        label: 'Thiếu Tài liệu', 
        variant: 'error', 
        icon: <AlertCircle size={12} />,
        bgClass: 'bg-rose-50',
        textClass: 'text-rose-600'
      };
    }
    if (task.status === 'Completed') {
      return { 
        label: 'Hoàn thành', 
        variant: 'success', 
        icon: <CheckCircle2 size={12} />,
        bgClass: 'bg-emerald-50',
        textClass: 'text-emerald-600'
      };
    }
    return { 
      label: 'Đang xử lý', 
      variant: 'warning', 
      icon: <Clock size={12} />,
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-600'
    };
  };

  const status = getStatusInfo(task);
  
  // Category color mapping
  const getCategoryColor = (category) => {
    const colors = {
      'Bê tông': 'primary',
      'Cốt thép': 'slate',
      'Hoàn thiện': 'warning',
      'Móng cọc': 'error'
    };
    return colors[category] || 'slate';
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all border-l-4 relative group overflow-hidden ${
        isActive 
          ? 'bg-white border-indigo-600 shadow-lg ring-1 ring-indigo-100 transform scale-[1.01]' 
          : 'border-transparent hover:bg-white/70 hover:translate-x-0.5 hover:shadow-sm'
      }`}
    >
      {/* Background gradient for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-transparent pointer-events-none"></div>
      )}

      <div className="relative z-10">
        {/* Top Row: Category & Date */}
        <div className="flex justify-between items-start mb-2.5">
          <Badge variant={getCategoryColor(task.category)}>
            {task.category || 'NTCV'}
          </Badge>
          <span className="text-[9px] text-slate-400 font-bold group-hover:text-indigo-600 transition-colors">
            {new Date(task.inspection_date).toLocaleDateString('vi-VN', { 
              day: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
        
        {/* Task Name */}
        <h3 className={`font-bold text-sm mb-2.5 leading-tight line-clamp-2 transition-colors ${
          isActive 
            ? 'text-slate-900' 
            : 'text-slate-700 group-hover:text-slate-900'
        }`}>
          {task.name}
        </h3>
        
        {/* Location */}
        {task.location && (
          <p className="text-[9px] text-slate-500 mb-2.5 flex items-center gap-1.5">
            📍 <span>{task.location}</span>
          </p>
        )}
        
        {/* Bottom Row: Status & Action */}
        <div className="flex items-center justify-between mt-3 gap-2">
          {/* Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all ${status.bgClass}`}>
            <span className="text-slate-600">{status.icon}</span>
            <span className={`text-[9px] font-bold uppercase tracking-tight ${status.textClass}`}>
              {status.label}
            </span>
          </div>
          
          {/* Delete Button - Show on Hover */}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onDelete(task.id); 
            }}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all"
            title="Xóa công tác"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export { TaskListItem };
