import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as actions from '../../actions';
import { bookingsSelector } from '../../../../state/reducers/booked';
import { bookedSelector } from '../../../../state/reducers';

import BookingModal from '../BookingModal';
import BookingSummary from '../BookingSummary';

const mockBookings = [
  {
    id: 1,
    orders: [{ id: 1, label: 'Purchase Order 1' }],
    quantity: 4,
    date: new Date(),
    time: new Date(),
  },
  {
    id: 2,
    orders: [
      { id: 2, label: 'Purchase Order 2' },
      { id: 22, label: 'Purchase Order 22' },
    ],
    quantity: 8,
    date: new Date(),
    time: new Date(),
  },
  {
    id: 3,
    orders: [
      { id: 3, label: 'Purchase Order 3' },
      { id: 33, label: 'Purchase Order 33' },
      { id: 333, label: 'Purchase Order 333' },
    ],
    quantity: 16,
    date: new Date(),
    time: new Date(),
  },
];

const mockFetchBookings = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBookings);
    }, 500);
  });

const styles = {
  root: {},
  button: {},
};

class BookedView extends React.Component {
  state = {
    showBookingModal: false,
  };

  componentDidMount() {
    this.fetchPurchaseOrders();
  }

  fetchPurchaseOrders = async () => {
    // api call.
    // set in redux
    const { setBookings } = this.props;

    if (setBookings) {
      const bookings = await mockFetchBookings();
      setBookings(bookings);
    }
  };

  showBookingModal = booking => {
    const { setBookingOrders } = this.props;

    const { orders } = booking;
    console.log({ booking });
    setBookingOrders(orders);

    this.setState({
      bookingInFlux: booking,
      showBookingModal: true,
    });
  };

  hideBookingModal = () => {
    this.setState({
      showBookingModal: false,
    });
  };

  handleConfirmBookingChange = async booking => {
    // const { bookings, bookingInFlux } = this.state;
    // const bookingIds = Object.keys(bookings);
    // // remove booking from list
    // const bookingSet = new Set();
    // set new booking
    this.hideBookingModal();
  };

  render() {
    const { bookings, classes } = this.props;
    const { showBookingModal } = this.state;

    if (!bookings) return <div>Loading</div>;

    return (
      <React.Fragment>
        {bookings.map(booking => (
          <Grid container spacing={24} key={booking.id}>
            <Grid item xs={8}>
              <BookingSummary id={booking.id} key={booking.id} {...booking} />{' '}
            </Grid>
            <Grid item xs={4}>
              <Button
                color="secondary"
                className={classes.button}
                onClick={() => this.showBookingModal(booking)}
              >
                Change Booking
              </Button>
            </Grid>
          </Grid>
        ))}
        <BookingModal
          open={showBookingModal}
          onClose={this.hideBookingModal}
          onConfirm={this.handleConfirmBookingChange}
        />
      </React.Fragment>
    );
  }
}

BookedView.propTypes = {
  bookings: PropTypes.array,
  setBookings: PropTypes.func,
  setBookingOrders: PropTypes.func,
};

const mapStateToProps = state => ({
  bookings: bookingsSelector(bookedSelector(state)),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(BookedView),
);
