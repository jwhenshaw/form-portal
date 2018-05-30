import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Grid } from '@material-ui/core';

import * as actions from '../../actions';
import { ordersSelector } from '../../../../state/reducers';
import { checkedOrdersSelector } from '../../../../state/reducers/orders';

import PurchaseOrderList from './PurchaseOrderList';
import BookingModal from '../BookingModal';

const mockOrders = [
  { id: 0, label: 'Purchase Order 1' },
  { id: 1, label: 'Purchase Order 2' },
  { id: 2, label: 'Purchase Order 3' },
  { id: 3, label: 'Purchase Order 4' },
];

const mockFetchOrders = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 2000);
  });

class Outstanding extends React.Component {
  state = {
    modalOpen: false,
  };

  componentDidMount() {
    if (!this.props.purchaseOrders) this.fetchPurchaseOrders();
  }

  fetchPurchaseOrders = async () => {
    // api call.
    // set in redux
    const { setPurchaseOrders } = this.props;

    if (setPurchaseOrders) {
      const orders = await mockFetchOrders();
      const uncheckedOrders = orders.map(order => ({
        ...order,
        checked: false,
      }));
      setPurchaseOrders(uncheckedOrders);
    }
  };

  handleInputChange = ({ id, event }) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const { purchaseOrders, setPurchaseOrders } = this.props;

    const orders = purchaseOrders.reduce((acc, order) => {
      if (order.id !== id) return [...acc, order];
      return [...acc, { ...order, checked: value }];
    }, []);

    setPurchaseOrders(orders);
  };

  setOrdersToBook = () => {
    // set selected purchase orders in redux
    const { checkedOrders, setBookingOrders } = this.props;
    setBookingOrders(checkedOrders);
  };

  openBookingModal = () => {
    this.setOrdersToBook();
    this.setState({ modalOpen: true });
  };

  closeBookingModal = () => {
    this.setState({ modalOpen: false });
  };

  handleConfirm = async ordersToRemove => {
    const { removePurchaseOrders } = this.props;
    // Update redux
    // remove the purchase orders in this booking.
    removePurchaseOrders(ordersToRemove);
    // send api request
    this.closeBookingModal();
  };

  render() {
    const { checkedOrders, purchaseOrders } = this.props;

    if (!purchaseOrders) return <div>Loading...</div>;

    const actionDisabled = !checkedOrders.length;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Grid container spacing={40}>
              <PurchaseOrderList
                orders={purchaseOrders}
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
          open={this.state.modalOpen}
          onClose={this.closeBookingModal}
          onConfirm={this.handleConfirm}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  purchaseOrders: ordersSelector(state).purchaseOrders,
  checkedOrders: checkedOrdersSelector(ordersSelector(state)),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Outstanding);
