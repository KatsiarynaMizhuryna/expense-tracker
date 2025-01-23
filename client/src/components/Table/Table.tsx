import React from 'react';
import styles from './Table.module.scss';
import credit from '../../../assets/Category/credit.svg';
import hobby from '../../../assets/Category/hobby.svg';

const categoryIcons: Record<string, string> = {
  Hobby: hobby,
  credit: credit
};

const Table: React.FC = () => {
  const rows = [
    { name: 'Figma', category: 'Hobby', date: '12 Jan 2024', total: -7.22 },
    { name: 'Adobe XD', category: 'credit', date: '12 Jan 2024', total: -7.22 }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.tableHead}`}>
          <div className={styles.checkbox}></div>
          <div className={styles.name}>Name</div>
          <div className={styles.category}>Category</div>
          <div className={styles.date}>Date</div>
          <div>Total</div>
          <div className={styles.actions}></div>{' '}
        </div>
        {rows.map((row, index) => (
          <div key={index} className={`${styles.row} ${styles.tableRow}`}>
            <div className={styles.checkbox}>
              <input type="checkbox" />
            </div>
            <div className={styles.name}>
              <span className={styles.icon}>
                <img
                  src={categoryIcons[row.category] || credit}
                  alt={`${row.category} icon`}
                />
              </span>
              {row.name}
            </div>
            <div className={styles.category}>{row.category}</div>
            <div className={styles.date}>{row.date}</div>
            <div className={styles.total}>{row.total.toFixed(2)}</div>
            <div className={styles.actions}>⋮</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
