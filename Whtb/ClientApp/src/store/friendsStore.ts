import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";

export interface initialStateType  {
    users: Array<userType>,
}

export interface userType {
    id : string,
    nick : string,
    sum: number
}
const unloadedState: initialStateType = { users: [] };

interface RequestUsers {
    type: 'REQUEST_USERS';
    users: Array<userType>
}

type KnownAction = RequestUsers;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_USERS':
            return {
                users: action.users
            };
    }
    return state;
};

export const actionCreators = {
    requestUsers: (): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.getUsers();
        dispatch({ type: 'REQUEST_USERS', users: response })
    },
    addFriend: (id:string): AppThunkAction<KnownAction> => async (dispatch) => {
        await API.addFriend(id);
        let response = await API.getUsers();
        dispatch({ type: 'REQUEST_USERS', users: response })
    }
};

