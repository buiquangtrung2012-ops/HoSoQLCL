import React from 'react';
import { Badge } from '../ui/Common';

/**
 * TaskHeader Component
 * Displays task name, ID, and status with improved hierarchy
 */
const TaskHeader = ({ task, onDelete, onHistory }) => {
  const hasAllDocuments = task.standards && task.status;
  
  return (
    <div className="p-6 border-b border-slate-100/50 flex justify-between items-start shrink-0 bg-white/30">
      <div className="flex-1">
        {/* Task Name - Primary Focus */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-2">
          {task.name}
        </h1>
        
        {/* Metadata Row */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">ID:</span>
            <code className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
              BB-{task.id}
            </code>
          </div>
          
          <Badge variant={hasAllDocuments ? 'success' : 'warning'}>
            {hasAllDocuments ? '✓ Đủ điều kiện' : '⚠ Thiếu dữ liệu'}
          </Badge>
          
          <span className="text-[9px] text-slate-400 font-bold">
            {new Date(task.inspection_date).toLocaleDateString('vi-VN')}
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 ml-4">
        {onHistory && (
          <button 
            onClick={onHistory}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Lịch sử thay đổi"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </button>
        )}
        
        {onDelete && (
          <button 
            onClick={onDelete}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Xóa công tác"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
