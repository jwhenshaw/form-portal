import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as actions from '../../actions';
import { bookingsSelector } from '../../../../state/reducers/booked';
import { bookingSelector, bookedSelector } from '../../../../state/reducers';

import BookingModal from '../BookingModal';
import BookingSummary from '../BookingSummary';

const mockBookings = [
  {
    orders: ['Purchase Order 1', 'Purchase Order 11'],
    quantity: 4,
    date: new Date(),
    time: new Date(),
  },
  {
    orders: ['Purchase Order 2', 'Purchase Order 22'],
    quantity: 8,
    date: new Date(),
    time: new Date(),
  },
  {
    orders: ['Purchase Order 3'],
    quantity: 16,
    date: new Date(),
    time: new Date(),
  },
];

const mockFetchBookings = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBookings);
    }, 2000);
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

  showBookingModal = (booking) => {
    const {setBookingOrders} = this.props;
    setBookingOrders();
    this.setState({
      showBookingModal: true,
    });
  };

  hideBookingModal = () => {
    this.setState({
      showBookingModal: false,
    });
  };

  handleConfirmBookingChange = async () => {
    const { bookingToPersist } = this.props;
    console.log({ bookingToPersist });

    // remove booking from list
    // set new booking
  };

  render() {
    const { bookings, classes } = this.props;
    const { showBookingModal } = this.state;

    if (!bookings) return <div>Loading</div>;

    return (
      <React.Fragment>
        {Object.keys(bookings).map(key => (
          <Grid container spacing={24} key={key}>
            <Grid item xs={8}>
              <BookingSummary id={key} key={key} {...bookings[key]} />{' '}
            </Grid>
            <Grid item xs={4}>
              <Button
                color="secondary"
                className={classes.button}
                onClick={this.showBookingModal}
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
  bookingToPersist: PropTypes.object,
};

const mapStateToProps = state => ({
  bookings: bookingsSelector(bookedSelector(state)),
  bookingToPersist: bookingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(BookedView),
);
