import React from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../actions";
import { bookingSelector } from "../../../../../state/reducers";
import { bookingQuantitySelector } from "../../../../../state/reducers/booking";

const Quanity = ({ setBookingQuantity, value }) => (
  <div>
    <h4>How many pallets will be delivered?</h4>
    <TextField
      id="quantity"
      label="Quanity"
      value={value}
      onChange={evt => setBookingQuantity(evt.target.value)}
      type="number"
      margin="normal"
    />
  </div>
);

const mapStateToProps = state => {
  const bookingState = bookingSelector(state);
  return {
    value: bookingQuantitySelector(bookingState)
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quanity);
