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
          <div key={order} style={{ marginLeft: '35px' }}>
            {order}
          </div>
        ))}
      </div>
    </Grid>
  </Grid>
);

BookingSummary.propTypes = {
  orders: PropTypes.array,
  quantity: PropTypes.number,
  date: PropTypes.object,
  time: PropTypes.object,
};

export default BookingSummary;
