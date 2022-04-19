﻿import s from "./friends.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as FriendsReducerStore from "../../store/friendsStore";
import {useEffect, useState} from "react";
import defaultAvatar from "../../assets/avatar.jpg";
import WithAuthRedirect from "../WithAuthRedirect/WithAuthRedirect";
import {compose} from "redux";
import NewFriend from "../NewFriend/NewFriend";
import Modal from './../modal/Modal';

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
    const [modalActive, setModalActive] = useState(false);
    useEffect(() => {
        props.requestUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    let users = null;
    if (props.state.users && props.state.users.length > 0)
    {
        users = props.state.users.map((u : FriendsReducerStore.userType) => Friend(u.id, u.nick, null))
    }
    let onSubmit = (formData: any) =>
    {
        setModalActive(false)
        var id = formData.id;
        props.addFriend(id);
        props.requestUsers();
    }
    return (
        <div className={s.friends}>
            <button onClick={() =>setModalActive(true)}>Добавить друга</button>
            {users}
            <Modal active={modalActive} setActive={setModalActive}>
                <NewFriend onSubmit = {onSubmit}/>
            </Modal>
        </div>
    )
}

export default compose<React.ComponentType>(
    connect((state: ApplicationState) => ({ state: state.friends, user: state.login }), FriendsReducerStore.actionCreators),
    WithAuthRedirect)
(Friends as any);

