import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { BookingContext } from '..';

const Time = ({ setTime, time }) => (
  <div>
    <h4>What time will the pallets be delivered?</h4>
    <DatePicker
      inline
      selected={time}
      onChange={setTime}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
    />
  </div>
);

const withContext = Component => props => (
  <BookingContext.Consumer>
    {({ state: { time }, actions: { setTime } }) => (
      <Component {...props} time={time} setTime={setTime} />
    )}
  </BookingContext.Consumer>
);
export default withContext(Time);
