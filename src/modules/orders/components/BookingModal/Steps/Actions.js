import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const Actions = ({
  activeStep,
  classes,
  onBack,
  onConfirm,
  onNext,
  stepComplete,
  steps
}) => {
  const finalStep = activeStep === steps.length - 1;
  return (
    <div>
      <Button
        disabled={activeStep === 0}
        onClick={onBack}
        className={classes.button}
      >
        Back
      </Button>
      <Button
        disabled={!stepComplete}
        variant="raised"
        color="primary"
        onClick={finalStep ? onConfirm : onNext}
        className={classes.button}
      >
        {finalStep ? "Confirm" : "Next"}
      </Button>
    </div>
  );
};

Actions.propTypes = {
  activeStep: PropTypes.number,
  classes: PropTypes.object,
  onBack: PropTypes.func,
  onConfirm: PropTypes.func,
  onNext: PropTypes.func,
  stepComplete: PropTypes.bool,
  steps: PropTypes.array
};

export default Actions;
