import {userConstants} from '../_constants';

const initialState = {
  loggingIn: false,
  loggedIn: false,
  userId: null
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        userId: null
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        userId: action.uuid
      };
    case userConstants.LOGIN_FAILURE:
      return {};

    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}