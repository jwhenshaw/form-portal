import React from 'react';
import PropTypes from 'prop-types';

import { Modal, withStyles } from '@material-ui/core';

import BookingSteps from './Steps';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '80%',
    padding: theme.spacing.unit * 4,
    position: 'absolute',
    width: '90%',
  },
});

export const BookingContext = React.createContext({});

class BookingModal extends React.Component {
  state = {
    quantity: 1,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      orders: props.orders,
    };
  }

  setBookingValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleDateChange = date => this.setBookingValue('date', date);
  handleTimeChange = time => this.setBookingValue('time', time);
  handleQuantityChange = quantity => this.setBookingValue('quantity', quantity);

  render() {
    const { open, onClose, onConfirm, classes } = this.props;

    return (
      <Modal
        aria-labelledby="booking-modal"
        aria-describedby="booking-steps-modal"
        open={open}
        onClose={onClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <BookingContext.Provider
            value={{
              state: this.state,
              actions: {
                setDate: this.handleDateChange,
                setQuantity: this.handleQuantityChange,
                setTime: this.handleTimeChange,
              },
            }}
          >
            <BookingSteps onConfirm={onConfirm} onClose={onClose} />
          </BookingContext.Provider>
        </div>
      </Modal>
    );
  }
}

BookingModal.propTypes = {
  open: PropTypes.bool,
  orders: PropTypes.array,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  onConfirm: PropTypes.func,
};

// We need an intermediary variable for handling the recursive nesting.
const BookingModalWrapped = withStyles(styles)(BookingModal);

export default BookingModalWrapped;
