import React from 'react';
import { connect } from 'react-redux';

import { bookingOrdersSelector } from '../../../../../state/reducers/booking';
import { bookingSelector } from '../../../../../state/reducers';
import {
  bookingDateSelector,
  bookingQuantitySelector,
  bookingTimeSelector,
} from '../../../../../state/reducers/booking';
import BookingSummary from '../../BookingSummary';

const Summary = props => <BookingSummary {...props} />;

const mapStateToProps = state => {
  const bookingState = bookingSelector(state);

  return {
    orders: bookingOrdersSelector(bookingState),
    quantity: bookingQuantitySelector(bookingState),
    date: bookingDateSelector(bookingState),
    time: bookingTimeSelector(bookingState),
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
