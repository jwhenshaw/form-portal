import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';

import { outstandingConsumerHoC } from '../../context/outstandingContext';

import BookingModal from '../BookingModal';
import PurchaseOrderList from './PurchaseOrderList';

class Outstanding extends React.Component {
  state = {
    modalOpen: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.orders) return null;

    const { orders, checkedOrders } = props.orders.reduce(
      (acc, order) => ({
        orders: [...acc.orders, order],
        checkedOrders: [
          ...acc.checkedOrders,
          ...(order.checked ? [order] : []),
        ],
      }),
      {
        orders: [],
        checkedOrders: [],
      },
    );

    return {
      ...state,
      orders,
      checkedOrders,
    };
  }

  handleInputChange = ({ id, event }) => {
    this.props.onSelectOrder({ id });
  };

  openBookingModal = () => {
    this.setState({ modalOpen: true });
  };

  closeBookingModal = () => {
    this.setState({ modalOpen: false });
  };

  handleConfirm = async ({ orders, quantity, date, time }) => {
    // send api request
    this.closeBookingModal();
  };

  render() {
    const { checkedOrders, orders } = this.state;

    if (!orders) return <div>Loading...</div>;

    const actionDisabled = !checkedOrders.length;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Grid container spacing={40}>
              <PurchaseOrderList
                orders={orders}
                onClickItem={this.handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Button
                  variant="raised"
                  color="primary"
                  disabled={actionDisabled}
                  onClick={this.openBookingModal}
                >
                  Book in selected orders
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <BookingModal
          orders={checkedOrders}
          open={this.state.modalOpen}
          onClose={this.closeBookingModal}
          onConfirm={this.handleConfirm}
        />
      </React.Fragment>
    );
  }
}

Outstanding.propTypes = {
  orders: PropTypes.array,
  onSelectOrder: PropTypes.func,
};

export default outstandingConsumerHoC(Outstanding);
