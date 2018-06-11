import React from 'react';

import { BookingContext } from '../';
import BookingSummary from '../../BookingSummary';

export default props => (
  <BookingContext.Consumer>
    {({ state }) => <BookingSummary {...props} {...state} />}
  </BookingContext.Consumer>
);
