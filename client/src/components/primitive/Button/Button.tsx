import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  active = false,
  disabled = false
}) => {
  const classNames = `${styles.button} 
                      ${active ? styles.active : ''} 
                      ${disabled ? styles.disabled : ''}`;

  return (
    <button
      className={classNames}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
