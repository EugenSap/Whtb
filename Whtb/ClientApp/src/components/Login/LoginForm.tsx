import {Field, reduxForm} from "redux-form";
import {useState} from "react";
import * as React from "react";

const Login = (props : any) => {
    const [register, setRegister] = useState(false);
    const ChnageRegister = (e : any) => {
        setRegister(e.target.checked)
    }
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name="Login"
                           component="input"
                           type="text"
                           placeholder="Login"/>
                </div>
                <div>
                    {register && <Field name="Nick"
                           component="input"
                           type="text"
                           placeholder="Nick"/>}
                </div>
                <div>
                    <Field name="Password"
                           component="input"
                           type="password"
                           placeholder="Password"/>
                </div>
                <div>
                    <Field name="Register"
                           component="input"
                           type="checkbox"
                           onChange={ChnageRegister}/>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default reduxForm({
    form: 'Login',
})(Login)