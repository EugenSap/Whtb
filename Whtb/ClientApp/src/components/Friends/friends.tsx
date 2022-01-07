import s from "./friends.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as FriendsReducerStore from "../../store/friendsStore";
import {useEffect} from "react";
import defaultAvatar from "../../assets/avatar.jpg";
import WithAuthRedirect from "../WithAuthRedirect/WithAuthRedirect";

const Friend = (id : string, name: string, picture : any) => {
    return (
        <div key={id}>
            <div>
                <img className={s.picture} src={ picture ? picture : defaultAvatar} alt="AVATAR"/>
            </div>
            <div>
                {name}
            </div>
        </div>
    )
}
const Friends = (props: any) =>
{
    useEffect(() => {
        props.requestUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    let users = null;
    if (props.state.users && props.state.users.length > 0)
    {
        users = props.state.users.map((u : FriendsReducerStore.userType) => Friend(u.id, u.nick, null))
    }
    
    return (
        <div className={s.friends}>
            {users}
        </div>
    )
}

let connected = connect(
    (state: ApplicationState) => ({ state: state.friends, user: state.login }), // Selects which state properties are merged into the component's props
    FriendsReducerStore.actionCreators // Selects which action creators are merged into the component's props
)(Friends as any);

export default WithAuthRedirect(connected)

