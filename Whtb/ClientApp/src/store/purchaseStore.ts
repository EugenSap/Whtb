import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";
import { IPurchaseType } from "../models/interfaces";

export interface initialStateType {
    purchase: IPurchaseType | undefined
}
const unloadedState: initialStateType = { purchase: undefined };

interface RequestPurchase {
    type: 'REQUEST_PURCHASE';
    purchase: IPurchaseType
}

type KnownAction = RequestPurchase;

export const reducer: Reducer<initialStateType> = (state: initialStateType | undefined, incomingAction: Action): initialStateType => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PURCHASE':
            return {
                purchase: action.purchase
            };
    }
    return state;
};

export const actionCreators = {
    requestPurchase: (purchaseId : string): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.getPurchase(purchaseId);
        dispatch({ type: 'REQUEST_PURCHASE', purchase: response })
    },
    postPurchase: (purchase : IPurchaseType, updateData: () => {}): AppThunkAction<KnownAction> => async (dispatch) => {
        await API.postPurchase(purchase);
        updateData();
    },
};