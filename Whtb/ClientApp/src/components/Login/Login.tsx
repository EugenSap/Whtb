import * as React from "react";
import LoginForm from "./LoginForm";
import s from "./login.module.css"
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as LoginStore from "../../store/loginStore";
import {useHistory} from "react-router-dom";

let Login = (props : any) => {
    let history = useHistory();
    console.log(history);
    let onSubmit = (FormData : any) => {
        props.login(FormData.Login, FormData.Password);
        history.push('/')
    }
    return (
        <div className={s.login}>
            <LoginForm onSubmit = {onSubmit}/>
        </div>
    )
}

export default connect(
    (state: ApplicationState) => ({ state: state.login }), // Selects which state properties are merged into the component's props
    LoginStore.actionCreators // Selects which action creators are merged into the component's props
)(Login as any);

