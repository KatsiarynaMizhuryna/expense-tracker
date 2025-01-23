import './App.css';
import Table from './components/primitive/Table/Table';
import { useState } from 'react';
import DatePickerField from './components/primitive/DatePicker/DatePicker';

function App() {
  const [selectedDate, setDate] = useState<Date | null>(null);
  return (
    <>
      <DatePickerField
        selectedDate={selectedDate}
        onChange={(date) => setDate(date)}
      />
      {/* <Table /> */}
    </>
  );
}

export default App;
