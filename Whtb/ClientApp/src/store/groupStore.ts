import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";
import {userType} from "./friendsStore";

export interface initialStateType {
    group: groupType | undefined
}

export interface groupType {
    id : string,
    groupName : string,
    remainSum : number,
    allSum : number,
    dateTime : string
    groupStatus : number,
    userStatusForGroup : number,
    users : Array<userType>,
    purchases : Array<purchaseType>,
}

export interface purchaseType {
    id : string,
    name : string,
    cost : number
    user : string
}
const unloadedState: initialStateType = { group: undefined };

interface RequestGroups {
    type: 'REQUEST_GROUP';
    group: groupType
}

type KnownAction = RequestGroups;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_GROUP':
            return {
                group: action.group
            };
    }
    return state;
};

export const actionCreators = {
    requestGroup: (userId : string, groupId : string): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.getGroup(userId, groupId);
        dispatch({ type: 'REQUEST_GROUP', group: response })
    },

    addPurchase: (purchaseName: string, purchaseCost: number, groupId: string, userId: string): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.addPurchase(purchaseName, purchaseCost, groupId, userId);
        dispatch({ type: 'REQUEST_GROUP', group: response })
    },

    assignPurchase:  (groupId: string, userId: string, purchaseId: string): AppThunkAction<KnownAction> => async (dispatch) => {
    let response = await API.assignPurchase(groupId, userId, purchaseId);
    dispatch({ type: 'REQUEST_GROUP', group: response })
    },
};

