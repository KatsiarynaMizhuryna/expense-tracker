import './App.css';
import Table from './components/primitive/Table/Table';
import { useState } from 'react';
import DatePickerField from './components/primitive/DatePicker/DatePicker';
import Menu from './components/primitive/Menu/Menu';

function App() {
  const [selectedDate, setDate] = useState<Date | null>(null);
  return (
    <>
      <DatePickerField
        selectedDate={selectedDate}
        onChange={(date) => setDate(date)}
      />
      {/* <Table /> */}
      <Menu
        onEdit={() => console.log('edit')}
        onDelete={() => console.log('delete')}
      />
    </>
  );
}

export default App;
