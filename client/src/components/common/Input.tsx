import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    fullWidth = true, 
    className = '',
    labelClassName = '',
    inputClassName = '',
    startIcon,
    endIcon,
    ...props 
  }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
    const inputId = inputProps.id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // 外層容器樣式
    const containerClasses = `form-group ${fullWidth ? 'w-full' : ''} ${className}`;
    
    // 標籤樣式
    const labelClasses = `form-label ${labelClassName}`;
    
    // 輸入框容器樣式（用於定位圖標）
    const inputWrapperClasses = 'relative';
    
    // 輸入框樣式
    const inputClasses = `form-input ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''} 
      ${startIcon ? 'pl-10' : ''} ${endIcon ? 'pr-10' : ''} ${inputClassName}`;
    
    // 幫助文本樣式
    const helperClasses = 'form-helper';
    
    // 錯誤文本樣式
    const errorClasses = 'form-error';
    
    return (
      <div className={containerClasses}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={labelClasses}
          >
            {label}
          </label>
        )}
        
        <div className={inputWrapperClasses}>
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={helperText ? `${inputId}-helper` : error ? `${inputId}-error` : undefined}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className={helperClasses}>{helperText}</p>
        )}
        
        {error && (
          <p id={`${inputId}-error`} className={errorClasses} role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 