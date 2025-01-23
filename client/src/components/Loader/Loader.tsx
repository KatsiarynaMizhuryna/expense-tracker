import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  src: string;
  alt: string;
}

const Loader: React.FC<LoaderProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.loader} />;
};

export default Loader;
