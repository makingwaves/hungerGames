import { combineReducers } from 'redux';
import { AuthState } from './auth/types';
import { authReducer } from './auth/reducer';
import { MembersState } from './members/types';
import { membersReducer } from './members/reducer';
import { LunchesState } from './lunches/types';
import { lunchesReducer } from './lunches/reducer';

export interface AppState {
    auth: AuthState;
    members: MembersState;
    lunches: LunchesState;
}

export default combineReducers({
    auth: authReducer,
    members: membersReducer,
    lunches: lunchesReducer,
});
