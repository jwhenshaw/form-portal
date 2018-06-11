import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import { BookingContext } from '../index';

const Quantity = ({ setQuantity, quantity }) => (
  <div>
    <h4>How many pallets will be delivered?</h4>
    <TextField
      id="quantity"
      label="Quantity"
      value={quantity}
      onChange={evt => setQuantity(evt.target.value)}
      type="number"
      margin="normal"
    />
  </div>
);

Quantity.propTypes = {
  quantity: PropTypes.number,
  onChange: PropTypes.func,
};

const withContext = Component => props => (
  <BookingContext.Consumer>
    {({ state: { quantity }, actions: { setQuantity } }) => (
      <Component {...props} quantity={quantity} setQuantity={setQuantity} />
    )}
  </BookingContext.Consumer>
);

export default withContext(Quantity);
