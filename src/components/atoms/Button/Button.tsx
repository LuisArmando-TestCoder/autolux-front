import React from 'react';
import styles from './Button.module.scss';

// distinct interface for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glow';
  label: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  label, 
  className,
  ...props 
}) => {
  // Combine module class with custom variant and any passed className
  const combinedClassName = `
    ${styles.button} 
    ${styles[`button--${variant}`]} 
    ${className || ''}
  `.trim();

  return (
    <button className={combinedClassName} {...props}>
      {label}
    </button>
  );
};

export default Button;
