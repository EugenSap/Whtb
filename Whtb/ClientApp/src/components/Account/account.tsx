import * as React from "react";
import s from "./account.module.css"
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import { AccountProps } from "../../models/types";
import {useParams} from "react-router-dom";
import * as UserReducerStore from "../../store/userStore";
import {useEffect} from "react";
import { stat } from "fs";

interface IAccount {
    requestUserInfo: (arg0: string) => {},
    state: {
        account: AccountProps
    },
}

let Account = (props: any) => {
    const {id} = useParams<{id: string}>();

    let usrId = props?.user?.userInfo?.id ?? 'notId'
    useEffect(() => {
        let userId = id ?? props.login.id;
        props.requestUserInfo(userId);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={s.account}>
            Id: {usrId}
        </div>
    )
}

export default connect(
    (state: ApplicationState) => ({ login: state.login, user: state.user }),
    UserReducerStore.actionCreators
)(Account as any);
