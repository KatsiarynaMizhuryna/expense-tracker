import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <input className={styles.input} type="text" placeholder={placeholder} />
  );
};

export default Input;
