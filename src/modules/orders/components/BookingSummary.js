import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Grid } from '@material-ui/core';

const BookingSummary = ({ orders, quantity, date, time }) => (
  <Grid container>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={12}>
          <span>{moment(date).format('DD/MM/YYYY')}</span>
          <span> @ </span>
          <span>{moment(time).format('HH:ss')}</span>
        </Grid>
      </Grid>
      <div>
        {orders.map(order => (
          <div key={order.id} style={{ marginLeft: '35px' }}>
            {order.label}
          </div>
        ))}
      </div>
    </Grid>
  </Grid>
);

BookingSummary.propTypes = {
  orders: PropTypes.array.isRequired,
  quantity: PropTypes.number.isRequired,
  date: PropTypes.object.isRequired,
  time: PropTypes.object.isRequired,
};

export default BookingSummary;
