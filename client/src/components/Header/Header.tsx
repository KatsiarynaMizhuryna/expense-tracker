import Logo from '../Logo/Logo';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <div className={styles.header}>
      <Logo src={logo} alt={'logo'} />
    </div>
  );
}

export default Header;
