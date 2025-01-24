import styles from './MenuItem.module.scss';
interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <button className={styles.dropdown_item} onClick={onClick}>
      {label}
    </button>
  );
};

export default MenuItem;
