import s from "./groups.module.css"
import * as React from 'react';
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as GroupsReducerStore from "../../store/groupsStore";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import WithAuthRedirect from "../WithAuthRedirect/WithAuthRedirect";
import { compose } from "redux";
import Modal from "../modal/Modal";
import NewGroup from "./newGroup";

const Group = (props: GroupsReducerStore.groupType) => {
    return (
        <Link to={`group/${props.id}`}>
        <div key={props.id} className={s.group}>
            <div> Название группы: {props.groupName} </div>
            <div> Статус: {props.groupStatus} </div>
            <div> Статус пользователя: {props.userStatusForGroup} </div>
            <div> Дата: {props.dateTime} </div>
            <div> Остаток: {props.remainSum} </div>
            <div> Всего: {props.allSum} </div>
        </div>
        </Link>
    )
}
const Groups = (props: any) => {
    const [modalActive, setModalActive] = useState(false);
    const createGroup = () => {
        var date = new Date().toISOString();
        props.createGroup('test', date);
    }
    useEffect(() => {
        props.requestGroups();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let groups = null;
    if (props.state.groups && props.state.groups.length > 0) {
        groups = props.state.groups.map((g: GroupsReducerStore.groupType) => Group(g))
    }
    let onSubmit = (formData: any) =>
    {
        setModalActive(false)
        var date = formData.date.toISOString();
        props.createGroup(formData.name,date);
        props.requestGroups();
    }
    return (
        <div className={s.friends}>
            <button onClick={() =>setModalActive(true)}>Create Group</button>
            {groups}
            <Modal active={modalActive} setActive={setModalActive}>
                <NewGroup onSubmit = {onSubmit}/>
            </Modal>
        </div>
    )
}

export default compose<React.ComponentType>(connect(
    (state: ApplicationState) => ({ state: state.groups, user: state.login }), // Selects which state properties are merged into the component's props
    GroupsReducerStore.actionCreators // Selects which action creators are merged into the component's props
), WithAuthRedirect)(Groups as any);
