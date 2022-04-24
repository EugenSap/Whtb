import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";
import { IUserType } from './../models/interfaces';

export interface initialStateType {
    userInfo: IUserType | undefined,
}
const unloadedState: initialStateType = { userInfo: undefined };

interface RequesUser {
    type: 'REQUEST_USER';
    userInfo: IUserType | undefined,
}

type KnownAction = RequesUser;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_USER':
            return {
                userInfo: action.userInfo,
            };
    }
    return state;
};

export const actionCreators = {
    requestUserInfo: (id: string): AppThunkAction<KnownAction> => async (dispatch) => {
        let userInfo = await API.requestUserInfo(id);
        dispatch({ type: 'REQUEST_USER', userInfo: userInfo })
    },
};