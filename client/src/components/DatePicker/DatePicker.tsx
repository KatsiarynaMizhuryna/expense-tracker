import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.scss';
import calendar from '../../assets/calendar.svg';

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
    <div className={styles.custom_input_wrapper}>
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className={styles.custom_input}
      />
      <img src={calendar} alt="calendar" className={styles.calendar_icon} />
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
        customInput={
          <CustomInput
            value={selectedDate ? selectedDate.toDateString() : ''}
          />
        }
      >
        <div className={styles.buttons_container}>
          <button
            className={styles.selected_date_button}
            onClick={handleClearDate}
            type="button"
          >
            {selectedDate ? selectedDate.toLocaleDateString() : ''}
          </button>
          <button
            className={styles.set_button}
            onClick={handleSetDate}
            type="button"
          >
            Set Date
          </button>
        </div>
      </DatePicker>
    </label>
  );
};

export default DatePickerField;
