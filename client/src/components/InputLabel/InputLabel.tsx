import React from 'react';
import styles from './InputLabel.module.scss';

interface InputLabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ children, htmlFor }) => {
  return (
    <label className={styles.input_label} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default InputLabel;
