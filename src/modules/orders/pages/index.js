// @flow
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Tab, Tabs } from "@material-ui/core";

import { userSelector } from "../../../state/reducers";

import Booked from "../components/Booked";
import Outstanding from "../components/Outstanding";

const TabContainer = props => (
  <div style={{ padding: 8 * 3 }}>{props.children}</div>
);

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class MainPage extends React.Component {
  state = {
    view: 0
  };

  componentWillMount() {
    document.title = "Welcome | Orders";
  }

  handleChange = (event, value) => {
    this.setState({ view: value });
  };

  render() {
    const { classes } = this.props;
    const { view } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={view} onChange={this.handleChange}>
            <Tab label="Outstanding" />
            <Tab label="Booked" />
          </Tabs>
        </AppBar>
        {view === 0 && (
          <TabContainer>
            <Outstanding />{" "}
          </TabContainer>
        )}
        {view === 1 && (
          <TabContainer>
            <Booked />
          </TabContainer>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state)
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, null)
)(MainPage);
