import * as React from "react";
import LoginForm from "./LoginForm";
import s from "./login.module.css"
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as LoginStore from "../../store/loginStore";
import {useHistory} from "react-router-dom";

interface LoginProps {
    login: (arg0: string, arg1: string) => {},
    register: (arg0: string, arg1: string, arg3: string) => {}
}
let Login = (props : LoginProps) => {
    let history = useHistory();

    let onSubmit = (FormData : any) => {
        if (!FormData.Register)
        {
            props.login(FormData.Login, FormData.Password);
            history.push('/');
        }
        else
        {
            props.register(FormData.Login, FormData.Nick, FormData.Password)
        }
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

