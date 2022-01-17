import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";

export interface initialStateType  {
    groups: Array<groupType>,
}

export interface groupType {
    id : string,
    groupName : string,
    remainSum : number,
    allSum : number,
    dateTime:string
    groupStatus: number,
    userStatusForGroup:number
}
const unloadedState: initialStateType = { groups: [] };

interface RequestGroups {
    type: 'REQUEST_GROUPS';
    groups: Array<groupType>
}

type KnownAction = RequestGroups;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_GROUPS':
            return {
                groups: action.groups
            };
    }
    return state;
};

export const actionCreators = {
    requestGroups: (): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.getGroups();
        dispatch({ type: 'REQUEST_GROUPS', groups: response })
    },
    createGroup: (groupName: string, date: Date): AppThunkAction<KnownAction> => async (dispatch) => {
        await API.createGroup(groupName, date);
    }
};

