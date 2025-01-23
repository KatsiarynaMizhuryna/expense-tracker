import React from 'react';
import styles from './Menu.module.scss';

interface MenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Menu: React.FC<MenuProps> = ({ onEdit, onDelete }) => {
  return (
    <div className={styles.dropdownMenu}>
      <button className={styles.dropdownItem} onClick={onEdit}>
        Edit
      </button>
      <hr className={styles.divider} />
      <button className={styles.dropdownItem} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Menu;
