import s from "./group.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupReducerStore from "../../store/groupStore";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Modal from "../modal/Modal";
import Area from "../Area/Area";
import NewPurchase from "../PurchaseModal/NewPurchase";
import WithAuthRedirect from "../WithAuthRedirect/WithAuthRedirect";
import {compose} from "redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { IGroupType, IUserType, IPurchaseType, IColumnType, IStateType } from '../../models/interfaces';

interface IGroup {
    requestGroup: (arg0: string, arg1: string) => {},
    state: {
        group: IGroupType
    },
    addPurchase: (arg0: string, arg1: number, arg2: string, arg3: string) => {},
    assignPurchase: (arg0: string, arg1: string, arg2: string) => void,
    setGroupDate:  (arg0: string, arg1: string) => {}
}

const Group = (props: IGroup) => {
    const [modalActive, setModalActive] = useState(false);
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        props.requestGroup(id, id);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let updateData = () => {
        props.requestGroup(id, id);
    }
    useEffect(() => {
        const group: IGroupType | undefined = props.state.group;
        if (!group) {
            ;
        } else {
            let columns: Array<IColumnType> = props.state.group.users.map((u : IUserType) => ({
                id: u.id,
                title: u.nick,
                summ: u.sum,
                purchases: props.state.group.purchases.filter((p : IPurchaseType) => p.user?.id === u.id).map((p : IPurchaseType)  => p),
                purchaseIds: props.state.group.purchases.filter((p : IPurchaseType)  => p.user?.id === u.id).map((p : IPurchaseType)  => p.id),

            }));
            columns.unshift({
                id: "00000000-0000-0000-0000-000000000000",
                title: "Unassigned Purchases",
                summ: props.state.group.purchases.filter((p : IPurchaseType) => p.user?.id === "00000000-0000-0000-0000-000000000000").map((p : IPurchaseType) => p.cost).reduce((a: number, b: number) => a + b, 0),
                purchases: props.state.group.purchases.filter((p : IPurchaseType) => p.user?.id === "00000000-0000-0000-0000-000000000000").map((p : IPurchaseType)  => p),
                purchaseIds: props.state.group.purchases.filter((p : IPurchaseType)  => p.user?.id === "00000000-0000-0000-0000-000000000000").map((p : IPurchaseType)  => p.id)
            })
            let columnOrder: Array<string> = group.users.map(u => u.id);
            columnOrder.unshift("00000000-0000-0000-0000-000000000000");
            let st: IStateType = {
                purchases: props.state.group.purchases,
                columns: columns,
                columnOrder: columnOrder
            };
            setState(st)
            var date = new Date(props.state.group.dateTime)
            setStartDate(date);
        }
    }, [props.state.group])

    let initialState: IStateType = {
        purchases: [],
        columns: [],
        columnOrder: []
    };
    let [state, setState] = useState(initialState);
    let onSubmit = (formData: any) =>
    {
        setModalActive(false)
        props.addPurchase(formData.name, formData.cost, id, id)
    }

    let assignPurchase = (userId: string, purchaseId: string) =>
    {
        props.assignPurchase(id, userId, purchaseId)
    }

    const [startDate, setStartDate] = useState(new Date());

    const setDate = (date: Date) =>
    {
        var date2 = date.toISOString();
        props.setGroupDate(id, date2)
    }

    return (
        <div className={s.group2}>
            <DatePicker selected={startDate} onChange={(date:Date) => setDate(date)} />
            <Modal active={modalActive} setActive={setModalActive}>
                <NewPurchase onSubmit = {onSubmit}/>
            </Modal>
            <Area setState={setState} state={state} assignPurchase={assignPurchase} updateData={updateData} />
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
    WithAuthRedirect)(Group as any);