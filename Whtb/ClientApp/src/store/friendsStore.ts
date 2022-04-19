import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";
import { IUserType } from "../models/interfaces";

export interface initialStateType  {
    users: Array<IUserType>,
}

const unloadedState: initialStateType = { users: [] };

interface RequestUsers {
    type: 'REQUEST_USERS';
    users: Array<IUserType>
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

