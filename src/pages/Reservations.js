import { useReducer } from 'react';
import './Reservations.css';
import BookingForm from '../components/BookingForm';

const initializeTimes = () => {
  return [
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30'
  ];
};

const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return initializeTimes();
    default:
      return state;
  }
};

const Reservations = () => {
  const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);

  const updateTimes = (date) => {
    dispatch({ type: 'UPDATE_TIMES', payload: date });
  };

  return (
    <main className="reservations-page">
      <div className="reservations-container">
        <h1>Reservation</h1>
        <BookingForm
          availableTimes={availableTimes}
          updateTimes={updateTimes}
        />
      </div>
    </main>
  );
};

export default Reservations;
