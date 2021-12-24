import s from "./group.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupReducerStore from "../../store/groupStore";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {groupType} from "../../store/groupStore";

const Group = (props: any) =>
{
    const { id }= useParams();
    useEffect(() => {
        props.requestGroup(id, id);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const group : groupType | undefined = props.state.group;
    if (group)
    {
        const purchases = group.purchases.map((p : GroupReducerStore.purchaseType) => <div key={p.id}>
            <div>{p.name}</div>
            <div>{p.cost}</div>
        </div>)
        const users = group.users.map(u => <div key={u.id}>
            <div>{u.nick}</div>
            <div>{u.id}</div>
        </div>)
        return <div className={s.group}>
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
    }
    return(
        <div className={s.group}>Group</div>
    )
    /*let click = () => {
        alert(111)
    }
    let groups = null;
    if (props.state.groups && props.state.groups.length > 0)
    {
        console.log(props.state.groups)
        groups = props.state.groups.map((g : GroupsReducerStore.groupType) => Group(g))
    }
    
    return (
        <div className={s.friends}>
            {groups}
        </div>
    )*/
}

//export default Friends;

export default connect(
    (state: ApplicationState) => ({ state: state.group }), // Selects which state properties are merged into the component's props
    GroupReducerStore.actionCreators // Selects which action creators are merged into the component's props
)(Group as any);