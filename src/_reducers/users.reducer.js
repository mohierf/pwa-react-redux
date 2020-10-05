import {apiConstants, userConstants} from '../_constants';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  items: [],
  profile: null
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
      };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
            user.id === action.id
                ? {...user, deleting: true}
                : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        error: true,
        errorMessage: action.error,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const {deleting, ...userCopy} = user;
            // return copy of user with 'deleteError:[error]' property
            return {...userCopy, deleteError: action.error};
          }

          return user;
        })
      };

    // Logged-in user profile
    case userConstants.PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        profile: null
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.profile
      };
    case userConstants.PROFILE_FAILURE:
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