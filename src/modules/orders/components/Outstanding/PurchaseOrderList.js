import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import PurchaseOrderItem from './PurchaseOrderItem';

const OrderList = ({ orders, onClickItem }) => (
  <Grid item xs={12}>
    {orders &&
      orders.map(order => (
        <PurchaseOrderItem
          key={order.id}
          checked={order.checked}
          label={order.label}
          onClick={event => onClickItem({ id: order.id, event })}
        />
      ))}
  </Grid>
);

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default OrderList;
