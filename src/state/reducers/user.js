import * as actionTypes from '../actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
          ...state,
          ...action.user,
        };
      default:
        return state;
    }
  };