import s from "./group.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupReducerStore from "../../store/groupStore";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {groupType} from "../../store/groupStore";
import WithAuthRedirect from "../WithAuthRedirect/WithAuthRedirect";
import {compose} from "redux";

const User = (props: any) => {
    return (
        <div key={props.id} className={s.user}>
            <div>{props.nick}</div>
            <div>{props.id}</div>
        </div>
    )
}

const Purchase = (props: any) => {
    return (
        <div key={props.id} className={s.purchase}>
            <div>{props.name}</div>
            <div>{props.cost}</div>
        </div>
    )
}

const Group = (props: any) => {
    const {id} = useParams();
    useEffect(() => {
        props.requestGroup(id, id);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const group: groupType | undefined = props.state.group;
    if (!group) {
        return (
            <div className={s.group}>Group</div>
        )
    }

    const purchases = group.purchases.map((p: GroupReducerStore.purchaseType) => <Purchase id={p.id} name={p.name}
                                                                                           cost={p.cost}/>)
    const users = group.users.map(u => <User id={u.id} nick={u.nick}/>)
    return (
        <div className={s.group}>
            <div className={s.head}>
                <div>{group.groupName}</div>
                <div>{group.dateTime}</div>
            </div>
            <div className={s.purchases}>
                {purchases}
            </div>
            <div className={s.users}>
                {users}
            </div>
        </div>
    )
}

let mapStateToProps = (state : ApplicationState) => {
    return {
        state: state.group,
        user: state.login
    }
}

export default compose(
    connect(mapStateToProps, GroupReducerStore.actionCreators),
    WithAuthRedirect,
)
(Group)