import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions';
import { bookingSelector } from '../../../../../state/reducers';
import { bookingTimeSelector } from '../../../../../state/reducers/booking';

const Time = ({ setBookingTime, value }) => (
  <div>
    <h4>What time will the pallets be delivered?</h4>
    <DatePicker
      inline
      selected={value}
      onChange={setBookingTime}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
    />
  </div>
);

const mapStateToProps = state => {
  const bookingState = bookingSelector(state);
  return {
    value: bookingTimeSelector(bookingState),
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);
