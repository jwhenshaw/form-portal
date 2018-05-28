import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../actions";
import { bookingSelector } from "../../../../../state/reducers";
import { bookingDateSelector } from "../../../../../state/reducers/booking";

const Date = ({ setBookingDate, value }) => (
  <div>
    <h4>On what date will the pallets be delivered?</h4>
    <DatePicker
      inline
      selected={value}
      onChange={setBookingDate}
      minDate={moment()}
    />
  </div>
);

const mapStateToProps = state => {
  const bookingState = bookingSelector(state);
  return {
    value: bookingDateSelector(bookingState)
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Date);
