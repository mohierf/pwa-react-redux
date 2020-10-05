import {apiConstants} from '../_constants';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  apiTitle: '',
  apiDescription: '',
  apiVersion: '',
  links: {},
  featureFlags: {},
  oidc: {},
  customConfiguration: {}
};

export function api(state = initialState, action) {
  switch (action.type) {
    case apiConstants.VERSION_REQUEST:
      return {
        ...state,
        apiTitle: '',
        apiDescription: '',
        apiVersion: '',
        links: {},
        featureFlags: {},
        oidc: {}
      };
    case apiConstants.VERSION_SUCCESS:
      return {
        ...state,
        apiTitle: action.version.api_title,
        apiDescription: action.version.api_description,
        apiVersion: action.version.api_version,
        links: Object.assign({...state.links}, {...action.version.links}),
        featureFlags: Object.assign(
            {...state.feature_flags},
            {...action.version.feature_flags}
        ),
        oidc: action.version.open_id_connect
      };
    case apiConstants.VERSION_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: action.error
      };

    case apiConstants.INFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case apiConstants.INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        // Do not update, version is the reference!
        // apiTitle: action.information.api_title,
        // apiDescription: action.information.api_description,
        // apiVersion: action.information.api_version,
        // links: Object.assign({...state.links}, {...action.information.links}),
        // Some more/different feature flags in the configuration
        featureFlags: Object.assign(
            {...state.feature_flags},
            {...action.information.feature_flags}
        ),
        customConfiguration: action.information.customConfiguration
      };
    case apiConstants.INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
      };

    default:
      return state
  }
}