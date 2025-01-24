import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from '../MenuItem/MenuItem';

interface MenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Menu: React.FC<MenuProps> = ({ onEdit, onDelete }) => {
  return (
    <div className={styles.dropdownMenu}>
      <MenuItem label="Edit" onClick={onEdit} />
      <hr className={styles.divider} />
      <MenuItem label="Delete" onClick={onDelete} />
    </div>
  );
};

export default Menu;
