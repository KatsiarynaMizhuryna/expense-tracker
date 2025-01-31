import React from 'react';
import styles from './Table.module.scss';
import credit from '../../assets/Category/credit.svg';
import hobby from '../../assets/Category/hobby.svg';

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
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkbox}></th>
            <th className={styles.name}>Name</th>
            <th className={styles.category}>Category</th>
            <th className={styles.date}>Date</th>
            <th>Total</th>
            <th className={styles.actions}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={styles.tableRow}>
              <td className={styles.checkbox}>
                <input type="checkbox" />
              </td>
              <td className={styles.name}>
                <span className={styles.icon}>
                  <img
                    src={categoryIcons[row.category] || credit}
                    alt={`${row.category} icon`}
                  />
                </span>
                {row.name}
              </td>
              <td className={styles.category}>{row.category}</td>
              <td className={styles.date}>{row.date}</td>
              <td className={styles.total}>{row.total.toFixed(2)}</td>
              <td className={styles.actions}>⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
