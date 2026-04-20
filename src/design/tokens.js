/**
 * Design Tokens - Street Lighting Optimization
 * High-fidelity theme based on industrial electrical documentation standards
 */

export const colors = {
  // Brand - Industrial Indigo/Purple
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
  },
  
  // Semantic
  success: { 50: '#ecfdf5', 600: '#059669', 700: '#047857' },
  warning: { 50: '#fffbeb', 600: '#d97706', 700: '#b45309' },
  error: { 50: '#fef2f2', 600: '#dc2626', 700: '#b91c1c' },
  info: { 50: '#eff6ff', 600: '#2563eb', 700: '#1d4ed8' },
  
  // Surface Colors - Neutral Light for "Floating Cards" effect
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    600: '#475569',
    800: '#1e293b',
    950: '#020617',
  }
};

export const layout = {
  sidebarWidth: 'w-60', // 240px (Max Sidebar as requested)
  taskListWidth: 'w-80', // 320px (Task list optimization)
  headerHeight: 'h-16',
};

export const card = {
  elevated: 'bg-white rounded-[1.25rem] shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300',
  glass: 'bg-white/40 backdrop-blur-xl border border-white/60 rounded-[1.25rem] shadow-sm',
};

export const typography = {
  label: 'text-[10px] font-black uppercase tracking-widest text-slate-400',
  title: 'text-lg font-bold text-slate-800 leading-tight',
  header: 'text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]',
};

export default {
  colors,
  layout,
  card,
  typography,
};
