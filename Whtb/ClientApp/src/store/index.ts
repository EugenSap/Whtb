import * as Friends from './friendsStore';
import * as Groups from './groupsStore';
import * as Group from './groupStore';
import * as Login from './loginStore';
import * as User from './userStore';
import { reducer as reduxFormReducer } from 'redux-form';

// The top-level state object
export interface ApplicationState {
    friends : Friends.initialStateType | undefined;
    groups : Groups.initialStateType | undefined;
    group : Group.initialStateType | undefined;
    login : Login.initialStateType | undefined;
    user : User.initialStateType | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    friends: Friends.reducer,
    groups: Groups.reducer,
    group: Group.reducer,
    form: reduxFormReducer,
    login: Login.reducer,
    user: User.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
