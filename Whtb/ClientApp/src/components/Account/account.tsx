import * as React from "react";
import s from "./account.module.css"
import { RouteComponentProps } from 'react-router';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as loginStore from "../../store/loginStore";
type AccountProps =
loginStore.initialStateType &
RouteComponentProps<{}>;
let Account = (props: AccountProps) => {
    return (
        <div className={s.account}>
            Id: {props.id}
        </div>
    )
}
export default connect(
    (state: ApplicationState) => state.login,
)(Account as any);
