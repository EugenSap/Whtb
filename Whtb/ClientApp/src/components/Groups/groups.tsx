import s from "./groups.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupsReducerStore from "../../store/groupsStore";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const Group = (props : GroupsReducerStore.groupType) => {
  return(
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
const Groups = (props: any) =>
{
    useEffect(() => {
        props.requestGroups();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let groups = null;
    if (props.state.groups && props.state.groups.length > 0)
    {
        groups = props.state.groups.map((g : GroupsReducerStore.groupType) => Group(g))
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