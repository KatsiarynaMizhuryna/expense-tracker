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
      />
    </label>
  );
};

export default DatePickerField;
