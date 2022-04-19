import * as React from "react";
import s from "./account.module.css"
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import { AccountProps } from "../../models/types";

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
