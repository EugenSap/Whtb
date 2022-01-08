import s from "./group.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupReducerStore from "../../store/groupStore";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {groupType, purchaseType} from "../../store/groupStore";
import {userType} from "../../store/friendsStore";
import Modal from "../modal/Modal";
import Area, {columnType, stateType} from "../Area/Area";
import NewPurchase from "../NewPurchase/NewPurchase";
import WithAuthRedirect from "../WithAuthRedirect/WithAuthRedirect";
import {compose} from "redux";
import * as GroupsReducerStore from "../../store/groupsStore";

const Group2 = (props: any) => {
    const [modalActive, setModalActive] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        props.requestGroup(id, id);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const group: groupType | undefined = props.state.group;
        if (!group) {
            ;
        } else {
            let columns: Array<columnType> = props.state.group.users.map((u : userType) => ({
                id: u.id,
                title: u.nick,
                purchases: props.state.group.purchases.filter((p : purchaseType) => p.user === u.id).map((p : purchaseType)  => p),
                purchaseIds: props.state.group.purchases.filter((p : purchaseType)  => p.user === u.id).map((p : purchaseType)  => p.id),

            }));
            columns.unshift({
                id: "00000000-0000-0000-0000-000000000000",
                title: "Unassigned Purchases",
                purchases: props.state.group.purchases.filter((p : purchaseType) => p.user === "00000000-0000-0000-0000-000000000000").map((p : purchaseType)  => p),
                purchaseIds: props.state.group.purchases.filter((p : purchaseType)  => p.user === "00000000-0000-0000-0000-000000000000").map((p : purchaseType)  => p.id)
            })
            let columnOrder: Array<string> = group.users.map(u => u.id);
            columnOrder.unshift("00000000-0000-0000-0000-000000000000");
            let st: stateType = {
                purchases: props.state.group.purchases,
                columns: columns,
                columnOrder: columnOrder
            };
            setState(st)
        }
    }, [props.state.group])

    let initialState: stateType = {
        purchases: [],
        columns: [],
        columnOrder: []
    };
    let [state, setState1] = useState(initialState);
    let setState = (st : stateType) => {
        setState1(st);
    }
    interface purchaseData {
        name: string,
        cost: number
    }
    let onSubmit = (formData: any) =>
    {
        setModalActive(false)
        props.addPurchase(formData.name, formData.cost, id, id)
    }

    let assignPurchase = (userId: string, purchaseId: string) =>
    {
        props.assignPurchase(id, userId, purchaseId)
    }

    return (
        <div className={s.group2}>
            <Modal active={modalActive} setActive={setModalActive}>
                <NewPurchase onSubmit = {onSubmit}/>
            </Modal>
            <Area setState={setState} state={state} assignPurchase={assignPurchase}/>
            <button onClick={() => setModalActive(true)}>New purchase</button>
        </div>
        )

}
let mapStateToProps = (state : ApplicationState) => {
    return {
        state: state.group,
        user: state.login
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, GroupReducerStore.actionCreators),
    WithAuthRedirect)(Group2 as any);