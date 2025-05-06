import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  id?: string;
  autoComplete?: string;
}

const Form: React.FC<FormProps> = ({ 
  children, 
  onSubmit, 
  className = '',
  id,
  autoComplete = 'on',
}: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const formClasses = className;

  return (
    <form 
      id={id}
      onSubmit={handleSubmit} 
      className={formClasses} 
      noValidate 
      autoComplete={autoComplete}
    >
      {children}
    </form>
  );
};

export default Form; 