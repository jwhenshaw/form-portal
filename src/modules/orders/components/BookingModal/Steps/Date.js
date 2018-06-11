import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { BookingContext } from '..';

const Date = ({ setDate, date }) => (
  <div>
    <h4>On what date will the pallets be delivered?</h4>
    <DatePicker inline selected={date} onChange={setDate} minDate={moment()} />
  </div>
);

Date.propTypes = {
  date: PropTypes.object,
  setDate: PropTypes.func,
};

const withContext = Component => props => (
  <BookingContext.Consumer>
    {({ state: { date }, actions: { setDate } }) => (
      <Component {...props} date={date} setDate={setDate} />
    )}
  </BookingContext.Consumer>
);

export default withContext(Date);
