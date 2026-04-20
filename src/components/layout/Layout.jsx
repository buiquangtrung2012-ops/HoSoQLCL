import React from 'react';
import { ShieldCheck, Home } from 'lucide-react';
import { layout } from '../../design/tokens';

/**
 * Sidebar Component (Refactored)
 * Reduced width (w-48), improved navigation hierarchy
 * PRIMARY: Navigation, SECONDARY: Project info
 */
const Sidebar = ({ navItems, activeTab, onTabChange, projectInfo }) => {
  return (
    <aside className={`${layout.sidebarWidth} glass-card p-5 flex flex-col gap-6 shrink-0 h-full overflow-hidden`}>
      {/* Logo & Brand */}
      <div className="flex items-center gap-2.5 px-1">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-sm tracking-tight text-slate-900">CQM Pro</div>
          <div className="text-[9px] text-slate-500 font-bold">Quality Mgmt</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all w-full text-left group relative overflow-hidden ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'text-slate-500 hover:bg-white/60 hover:text-indigo-600'
            }`}
            title={item.label}
          >
            {/* Active Indicator */}
            {activeTab === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/40"></div>
            )}
            
            <span className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
              activeTab === item.id 
                ? 'text-white' 
                : 'text-slate-400 group-hover:text-indigo-600'
            }`}>
              {item.icon}
            </span>
            
            <span className="font-bold text-[11px] tracking-wide uppercase truncate">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Project Info Card */}
      <div className="p-3.5 bg-indigo-50/70 rounded-lg border border-indigo-100/60 hover:border-indigo-200 transition-all">
        <p className="text-[8px] text-indigo-600 font-black uppercase mb-1.5 tracking-widest">📋 Hợp đồng</p>
        <p className="text-[10px] font-bold text-slate-700 leading-relaxed line-clamp-3">
          {projectInfo}
        </p>
      </div>
    </aside>
  );
};

const Header = ({ searchQuery, onSearchChange, onAddClick }) => {
  return (
    <header className="h-16 glass-card px-6 flex items-center justify-between shrink-0 mb-4 border-b border-slate-100/50">
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2.5 w-96 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-md transition-all duration-200">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm công việc, vị trí..."
          className="bg-transparent border-none outline-none text-xs w-full font-semibold text-slate-700 placeholder-slate-400"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Add New Button */}
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-full text-xs font-black hover:shadow-lg hover:from-slate-700 hover:to-slate-800 transition-all active:scale-95 duration-150"
        title="Thêm công tác mới"
      >
        <span className="text-lg">+</span>
        <span className="tracking-wider">THÊM MỚI</span>
      </button>
    </header>
  );
};

export { Sidebar, Header };
