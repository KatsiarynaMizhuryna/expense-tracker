import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.scss';
import calendar from '../../../assets/calendar.svg';

interface DatePickerFieldProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

interface CustomInputProps {
  value: string;
  onClick?: () => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => {
  return (
    <div className={styles['custom-input-wrapper']}>
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className={styles['custom-input']}
      />
      <img src={calendar} alt="calendar" className={styles['calendar-icon']} />
    </div>
  );
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  selectedDate,
  onChange
}) => {
  const handleSetDate = () => {
    onChange(new Date());
  };

  const handleClearDate = () => {
    onChange(null);
  };

  return (
    <label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        calendarClassName={styles['custom-datepicker']}
        customInput={
          <CustomInput
            value={selectedDate ? selectedDate.toDateString() : ''}
          />
        }
        renderCustomHeader={() => (
          <div className={styles['datepicker-buttons']}>
            <button
              className={styles['clear-button']}
              onClick={handleClearDate}
              type="button"
            >
              {selectedDate ? selectedDate.toLocaleDateString() : 'Set Date'}
            </button>
            <button
              className={styles['set-button']}
              onClick={handleSetDate}
              type="button"
            >
              Set Date
            </button>
          </div>
        )}
      />
    </label>
  );
};

export default DatePickerField;
