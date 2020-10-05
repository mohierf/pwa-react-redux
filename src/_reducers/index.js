import { combineReducers } from 'redux';

import { api } from './api.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    api,
    authentication,
    registration,
    users,
    alert
});

export default rootReducer;