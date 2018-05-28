import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles, Step, Stepper, StepLabel } from '@material-ui/core';

import DateStep from './Date';
import TimeStep from './Time';
import Summary from './Summary';
import StepActions from './Actions';
import QuantityStep from './Quantity';

import * as actions from '../../../actions';
import { checkedOrdersSelector } from '../../../../../state/reducers/orders';
import { bookingSelector, ordersSelector } from '../../../../../state/reducers';
import {
  bookingDateSelector,
  bookingQuantitySelector,
  bookingTimeSelector,
} from '../../../../../state/reducers/booking';

const styles = theme => ({
  root: {
    height: '100%',
    position: 'relative',
  },
  header: {},
  body: {},
  footer: {
    bottom: 0,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const getSteps = () => {
  return ['Specify how many', 'Select a date', 'Select a time', 'Confirm'];
};

const getStepContent = step => {
  switch (step) {
    case 0:
      return <QuantityStep />;
    case 1:
      return <DateStep />;
    case 2:
      return <TimeStep />;
    case 3:
      return <Summary />;
    default:
      return 'Unknown step';
  }
};

class BookingSteps extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepComplete = step => {
    switch (step) {
      case 0: {
        const { quantity } = this.props;
        return !!quantity;
      }
      case 1: {
        const { date } = this.props;
        return !!date;
      }
      case 2: {
        const { time } = this.props;
        return !!time;
      }
      default:
        return true;
    }
  };

  render() {
    const { onConfirm, orders, classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div className={classes.body}>{getStepContent(activeStep)}</div>
        <div className={classes.footer}>
          <StepActions
            activeStep={activeStep}
            classes={classes}
            onBack={this.handleBack}
            onConfirm={() => {
              onConfirm(orders);
            }}
            onNext={this.handleNext}
            onReset={this.handleReset}
            stepComplete={this.isStepComplete(activeStep)}
            steps={steps}
          />
        </div>
      </div>
    );
  }
}

BookingSteps.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,

  orders: PropTypes.array,
  quantity: PropTypes.number,
  date: PropTypes.object,
  time: PropTypes.object,
};

const mapStateToProps = state => {
  const ordersState = ordersSelector(state);
  const bookingState = bookingSelector(state);

  return {
    orders: checkedOrdersSelector(ordersState),
    quantity: bookingQuantitySelector(bookingState),
    date: bookingDateSelector(bookingState),
    time: bookingTimeSelector(bookingState),
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

const ConnectedBookingSteps = connect(mapStateToProps, mapDispatchToProps)(
  BookingSteps,
);

export default withStyles(styles)(ConnectedBookingSteps);
