import {alertConstants} from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      if (typeof action.message === "string") {
        return {
          type: 'alert-danger',
          message: action.message
        };
      }
      if (typeof action.message === "object") {
        return {
          type: 'alert-danger',
          message: action.message.message
        };
      }
      const messagesTemplates = Object.values(action.message).map((v) => (v.messageTemplate));
      const messages = Object.values(action.message).map((v) => (v.message));
      return {
        type: 'alert-danger',
        message: messages.join(', ')
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}