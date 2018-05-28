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

class SimpleModal extends React.Component {
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
          <BookingSteps onConfirm={onConfirm} onClose={onClose} />
        </div>
      </Modal>
    );
  }
}

SimpleModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  onConfirm: PropTypes.func,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
