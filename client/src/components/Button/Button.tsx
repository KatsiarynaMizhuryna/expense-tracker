import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  active = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const classNames = `${styles.button} 
                      ${active ? styles.active : ''} 
                      ${disabled ? styles.disabled : ''} 
                      ${className}`.trim();

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default Button;
