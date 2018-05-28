import React from "react";
import { Grid } from "@material-ui/core";

import PurchaseOrderItem from "./PurchaseOrderItem";

export default ({ orders, onClickItem }) => (
  <Grid item xs={12}>
    {orders &&
      Object.keys(orders).map(id => (
        <PurchaseOrderItem
          key={id}
          checked={orders[id].checked}
          label={orders[id].label}
          onClick={event => onClickItem({ id, event })}
        />
      ))}
  </Grid>
);
