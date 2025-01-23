import React from 'react';
import styles from './Logo.module.scss';

interface LogoProps {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.logo} />;
};

export default Logo;
