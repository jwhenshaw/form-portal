import * as actionTypes from '../../../state/actionTypes';

export const setUser = user => ({
  type: actionTypes.SET_USER,
  user,
});
