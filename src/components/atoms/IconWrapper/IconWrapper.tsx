import React from 'react';
import styles from './IconWrapper.module.scss';

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children, className }) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {children}
    </div>
  );
};

export default IconWrapper;
