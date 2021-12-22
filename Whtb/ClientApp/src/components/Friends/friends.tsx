import s from "./friends.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as FriendsReducerStore from "../../store/friendsStore";
import {useEffect} from "react";

const Friends = (props: any) =>
{
    useEffect(() => {
        props.requestUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    let users = null;
    if (props.state.users && props.state.users.length > 0)
    {
        console.log(props.state.users)
        users = props.state.users.map((u : FriendsReducerStore.userType) => <div key={u.id}>{u.nick}</div>)
    }
    
    return (
        <div className={s.friends}>
            {users}
        </div>
    )
}

//export default Friends;

export default connect(
    (state: ApplicationState) => ({ state: state.friends }), // Selects which state properties are merged into the component's props
    FriendsReducerStore.actionCreators // Selects which action creators are merged into the component's props
)(Friends as any);