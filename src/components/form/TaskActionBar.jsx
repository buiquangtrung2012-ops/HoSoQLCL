import React from 'react';
import { Download, Eye, Save } from 'lucide-react';
import { Button } from '../ui/Common';

/**
 * TaskActionBar Component
 * Sticky footer action bar for save and export operations
 * Primary actions are highly visible and accessible
 */
const TaskActionBar = ({ 
  task, 
  onSave, 
  onExport, 
  isSaving = false,
  isExporting = false,
  disabled = false
}) => {
  const allDocumentsReady = task.standards && task.category && task.location;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/95 to-slate-900/85 backdrop-blur-md border-t border-slate-700/50 shadow-2xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Status Info */}
        <div className="flex flex-col">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
            📋 Trạng thái tài liệu
          </p>
          <p className="text-xs text-slate-300 font-semibold mt-1 italic opacity-90">
            {allDocumentsReady 
              ? '✓ Sẵn sàng xuất bản - Tất cả thông tin đã hoàn thành'
              : '⚠ Còn thiếu thông tin - Vui lòng điền đầy đủ'}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 ml-6">
          {/* Save Button */}
          <Button 
            variant="secondary"
            size="md"
            icon={Save}
            onClick={onSave}
            disabled={isSaving || disabled}
            title="Lưu thay đổi"
          >
            {isSaving ? 'Đang lưu...' : 'Lưu'}
          </Button>
          
          {/* Export Button - Primary Action */}
          <Button 
            variant="action"
            size="md"
            icon={Download}
            onClick={onExport}
            disabled={!allDocumentsReady || isExporting || disabled}
            title={allDocumentsReady 
              ? 'Xuất hồ sơ (DOCX)' 
              : 'Hoàn thành tất cả thông tin để xuất'}
          >
            {isExporting ? 'Xuất...' : 'Xuất Hồ Sơ'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskActionBar;
