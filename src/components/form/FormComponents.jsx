import React from 'react';

/**
 * FormSection Component
 * Improved form section with better visual hierarchy and spacing
 * Combines label, icon, and content area
 */
const FormSection = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  className = '',
  highlighted = false 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Section Header */}
      {title && (
        <div className="flex items-center gap-2.5 px-1">
          {Icon && (
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
              highlighted 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-slate-100 text-slate-600'
            }`}>
              <Icon size={16} />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Content Area */}
      <div className={`bg-white/40 p-5 rounded-xl border border-slate-100/50 space-y-4 transition-all ${
        highlighted ? 'border-indigo-100 shadow-sm' : ''
      }`}>
        {children}
      </div>
    </div>
  );
};

/**
 * FormField Component
 * Consistent form field wrapper for input/select/textarea
 */
const FormField = ({ 
  label, 
  required = false, 
  error = null, 
  children,
  fullWidth = false,
  helpText = null 
}) => {
  return (
    <div className={fullWidth ? 'col-span-2' : 'col-span-1'}>
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-0.5 inline-block mb-2">
        {label}
        {required && <span className="text-rose-600 ml-1">*</span>}
      </label>
      
      <div>
        {children}
        
        {error && (
          <p className="text-[9px] text-rose-600 font-semibold mt-1.5">⚠ {error}</p>
        )}
        
        {helpText && !error && (
          <p className="text-[9px] text-slate-400 font-medium mt-1.5">
            💡 {helpText}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * FormGrid Component
 * Responsive grid wrapper for form fields
 */
const FormGrid = ({ children, columns = 2 }) => {
  return (
    <div className={`grid grid-cols-${columns} gap-6`}>
      {children}
    </div>
  );
};

export { FormSection, FormField, FormGrid };
