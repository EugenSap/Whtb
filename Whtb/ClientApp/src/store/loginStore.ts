import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";

export interface initialStateType {
    userName: string | undefined
}
const unloadedState: initialStateType = { userName: undefined };

interface RequestGroups {
    type: 'REQUEST_USER';
    userName: string | undefined
}

type KnownAction = RequestGroups;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_USER':
            return {
                userName: action.userName
            };
    }
    return state;
};

export const actionCreators = {
    requestUser: (): AppThunkAction<KnownAction> => async (dispatch) => {
        let userName = sessionStorage.getItem('username');
        dispatch({ type: 'REQUEST_USER', userName: !userName ? undefined : userName })
    },
    login: (userName: string, password: string) : AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.login(userName, password);
        sessionStorage.setItem('tokenKey', response.access_token)
        sessionStorage.setItem('username', response.username)
        dispatch({ type: 'REQUEST_USER', userName: !userName ? undefined : userName })
    },
    register: (userName: string, nick:string, password: string) : AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.register(userName, nick, password);
        sessionStorage.setItem('tokenKey', response.access_token)
        sessionStorage.setItem('username', response.username)
        dispatch({ type: 'REQUEST_USER', userName: !userName ? undefined : userName })
    },
};