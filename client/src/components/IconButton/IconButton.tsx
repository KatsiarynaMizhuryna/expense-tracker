import React, { ReactNode } from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  className = ''
}) => {
  return (
    <button className={`${styles.iconButton} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
