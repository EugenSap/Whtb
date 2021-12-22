import s from "./groups.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupsReducerStore from "../../store/groupsStore";
import {useEffect} from "react";

const Groups = (props: any) =>
{
    useEffect(() => {
        props.requestGroups();
    }, [])
    console.log(props);
    let groups = null;
    if (props.state.groups && props.state.groups.length > 0)
    {
        console.log(props.state.groups)
        groups = props.state.groups.map((g : GroupsReducerStore.groupType) => <div key={g.id}>
            <div> Название группы: {g.groupName} </div>
            <div> Статус: {g.groupStatus} </div>
            <div> Статус пользователя: {g.userStatusForGroup} </div>
            <div> Дата: {g.dateTime} </div>
            <div> Остаток: {g.remainSum} </div>
            <div> Всего: {g.allSum} </div>
        </div>)
    }
    
    return (
        <div className={s.friends}>
            {groups}
        </div>
    )
}

//export default Friends;

export default connect(
    (state: ApplicationState) => ({ state: state.groups }), // Selects which state properties are merged into the component's props
    GroupsReducerStore.actionCreators // Selects which action creators are merged into the component's props
)(Groups as any);