import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the styles

const CalendarComponent = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    return <Calendar onChange={handleDateSelect} value={selectedDate} />;
};

export default CalendarComponent;
