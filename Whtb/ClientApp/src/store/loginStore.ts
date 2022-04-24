import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";

export interface initialStateType {
    userName: string | undefined,
    id: string | undefined
}
const unloadedState: initialStateType = { userName: undefined, id: undefined };

interface RequestGroups {
    type: 'REQUEST_LOGIN';
    userName: string | undefined,
    id: string | undefined
}

type KnownAction = RequestGroups;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                userName: action.userName,
                id: action.id
            };
    }
    return state;
};

export const actionCreators = {
    requestUser: (): AppThunkAction<KnownAction> => async (dispatch) => {
        let userName = sessionStorage.getItem('username');
        let id = sessionStorage.getItem('id');
        dispatch({ type: 'REQUEST_LOGIN', userName: !userName ? undefined : userName, id: !id ? undefined : id })
    },
    login: (userName: string, password: string) : AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.login(userName, password);
        sessionStorage.setItem('tokenKey', response.access_token)
        sessionStorage.setItem('username', response.username)
        sessionStorage.setItem('id', response.id)
        dispatch({ type: 'REQUEST_LOGIN', userName: !response.username ? undefined : response.username, id: !response.id ? undefined : response.id })
    },
    register: (userName: string, nick:string, password: string) : AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.register(userName, nick, password);
        sessionStorage.setItem('tokenKey', response.access_token)
        sessionStorage.setItem('username', response.username)
        sessionStorage.setItem('id', response.id)
        dispatch({ type: 'REQUEST_LOGIN', userName: !response.username ? undefined : response.username, id: !response.id ? undefined : response.id })
    },
};