import React from 'react';

/**
 * Badge Component
 * Status and category badges with semantic color variants
 */
const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-100/60',
    warning: 'bg-amber-50 text-amber-600 border border-amber-100/60',
    error: 'bg-rose-50 text-rose-600 border border-rose-100/60',
    slate: 'bg-slate-100 text-slate-600 border border-slate-200/60'
  };

  return (
    <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

/**
 * Button Component
 * Versatile button with multiple variants and sizes
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 disabled:bg-slate-400',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:bg-slate-50',
    action: 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 active:from-indigo-800 active:to-indigo-900 shadow-lg shadow-indigo-100 disabled:from-indigo-400 disabled:to-indigo-500',
    ghost: 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:text-slate-300',
    danger: 'text-slate-500 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 disabled:text-slate-300'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-8 py-3.5 text-sm'
  };

  return (
    <button 
      className={`flex items-center justify-center gap-2 font-black rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      <span className="uppercase tracking-wider">{children}</span>
    </button>
  );
};

/**
 * FormSection Component
 * Legacy component - kept for backward compatibility
 * Use FormSection from TaskFormSections.jsx instead
 */
const FormSection = ({ title, children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {title && (
      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
        {title}
      </h3>
    )}
    <div className="bg-white/30 p-5 rounded-2xl border border-slate-100/50 space-y-4">
      {children}
    </div>
  </div>
);

/**
 * EmptyState Component
 * Displays an empty state with icon, title, and optional action
 */
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLabel 
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {Icon && <Icon size={48} className="text-slate-300 mb-4 opacity-60" />}
    <h3 className="text-sm font-bold text-slate-700">{title}</h3>
    {description && (
      <p className="text-[11px] text-slate-500 mt-1">{description}</p>
    )}
    {action && (
      <button
        onClick={action}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all"
      >
        {actionLabel || 'Hành động'}
      </button>
    )}
  </div>
);

/**
 * Card Component
 * Reusable card wrapper with consistent styling
 */
const Card = ({ children, className = '', elevated = false }) => (
  <div className={`bg-white/40 rounded-xl border border-slate-100/50 ${elevated ? 'shadow-md' : ''} ${className}`}>
    {children}
  </div>
);

export { Badge, Button, FormSection, EmptyState, Card };
