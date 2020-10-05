import {apiConstants} from '../_constants';
import {apiService} from '../_services';

export const apiActions = {
  version,
  information
};

function version() {
  return dispatch => {
    dispatch(request());

    // Get API version
    apiService.version()
        .then(
            version => {
              dispatch(success(version));
            },
            error => {
              dispatch(failure(error));
            }
        );
  };

  function request() {
    return {type: apiConstants.VERSION_REQUEST}
  }

  function success(version) {
    return {type: apiConstants.VERSION_SUCCESS, version}
  }

  function failure(error) {
    return {type: apiConstants.VERSION_FAILURE, error}
  }
}

function information() {
  return dispatch => {
    dispatch(request());

    // Get API information/configuration
    apiService.information()
        .then(
            information => {
              dispatch(success(information));
            },
            error => {
              dispatch(failure(error));
            }
        );
  };

  function request() {
    return {type: apiConstants.INFO_REQUEST}
  }

  function success(information) {
    return {type: apiConstants.INFO_SUCCESS, information}
  }

  function failure(error) {
    return {type: apiConstants.INFO_FAILURE, error}
  }
}
