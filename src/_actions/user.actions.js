import {apiActions, alertActions} from './';
import {userConstants} from '../_constants';
import {userService} from '../_services';
import {history} from '../_helpers';

export const userActions = {
  login,
  userProfile,
  logout,
  register,
  getAll,
  delete: _delete
};

function login(username, password, from) {
  return dispatch => {
    dispatch(requestLogin());

    userService.login(username, password)
        .then(
            uuid => {
              dispatch(successLogin(uuid));

              // Get API information/configuration
              dispatch(apiActions.information());

              // Get user profile
              dispatch(userProfile());

              console.log("From", from)
              history.push(from);
            },
            error => {
              dispatch(failureLogin(error));
              dispatch(alertActions.error(error));
            }
        );
  };

  function requestLogin() {
    return {type: userConstants.LOGIN_REQUEST}
  }

  function successLogin(uuid) {
    return {type: userConstants.LOGIN_SUCCESS, uuid}
  }

  function failureLogin(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
  }
}

function userProfile() {
  return dispatch => {
    dispatch(request());

    // Get API logged-in user profile
    userService.profile()
        .then(
            profile => {
              dispatch(success(profile));
            },
            error => {
              dispatch(failure(error));
            }
        );
  };

  function request() {
    return {type: userConstants.PROFILE_REQUEST}
  }

  function success(profile) {
    return {type: userConstants.PROFILE_SUCCESS, profile}
  }

  function failure(error) {
    return {type: userConstants.PROFILE_FAILURE, error}
  }
}

function logout() {
  userService.logout();
  return {type: userConstants.LOGOUT};
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
        .then(
            () => {
              dispatch(success());
              history.push('/login');
              dispatch(alertActions.success('Registration successful'));
            },
            error => {
              dispatch(failure(error));
              dispatch(alertActions.error(error));
            }
        );
  };

  function request(user) {
    return {type: userConstants.REGISTER_REQUEST, user}
  }

  function success(user) {
    return {type: userConstants.REGISTER_SUCCESS, user}
  }

  function failure(error) {
    return {type: userConstants.REGISTER_FAILURE, error}
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
        .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error))
        );
  };

  function request() {
    return {type: userConstants.GETALL_REQUEST}
  }

  function success(users) {
    return {type: userConstants.GETALL_SUCCESS, users}
  }

  function failure(error) {
    return {type: userConstants.GETALL_FAILURE, error}
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
        .then(
            user => dispatch(success(id)),
            error => dispatch(failure(id, error))
        );
  };

  function request(id) {
    return {type: userConstants.DELETE_REQUEST, id}
  }

  function success(id) {
    return {type: userConstants.DELETE_SUCCESS, id}
  }

  function failure(id, error) {
    return {type: userConstants.DELETE_FAILURE, id, error}
  }
}