import React from "react";
import { Grid } from "@material-ui/core";

export default ({ checked, label, onClick }) => (
  <Grid container spacing={40}>
    <Grid item xs={6}>
      {label}
    </Grid>
    <Grid item xs={6}>
      <input type="checkbox" checked={checked} onChange={onClick} />
    </Grid>
  </Grid>
);
