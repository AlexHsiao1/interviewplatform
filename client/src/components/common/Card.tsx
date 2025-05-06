import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  onClick,
  hoverEffect = !!onClick,
}: CardProps) => {
  const cardClasses = `card ${hoverEffect ? 'hover:shadow-lg transition-shadow' : ''} ${className}`;
  const headerClasses = `card-header ${headerClassName}`;
  const bodyClasses = `card-body ${bodyClassName}`;
  const footerClasses = `card-footer ${footerClassName}`;

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className={headerClasses}>
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>

      {footer && (
        <div className={footerClasses}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 