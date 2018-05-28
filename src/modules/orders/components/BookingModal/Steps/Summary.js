import React from 'react';
import { connect } from 'react-redux';

import { checkedOrdersSelector } from '../../../../../state/reducers/orders';
import { bookingSelector, ordersSelector } from '../../../../../state/reducers';
import {
  bookingDateSelector,
  bookingQuantitySelector,
  bookingTimeSelector,
} from '../../../../../state/reducers/booking';
import BookingSummary from '../../BookingSummary';

const Summary = props => <BookingSummary {...props} />;

const mapStateToProps = state => {
  const ordersState = ordersSelector(state);
  const bookingState = bookingSelector(state);

  const ordersObj = checkedOrdersSelector(ordersState);
  const orders = Object.keys(ordersObj).map(key => ordersObj[key].label);

  return {
    orders,
    quantity: bookingQuantitySelector(bookingState),
    date: bookingDateSelector(bookingState),
    time: bookingTimeSelector(bookingState),
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
