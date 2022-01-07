import {Field, reduxForm} from "redux-form";
import * as React from "react";

const Login = (props : any) => {
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
                    <Field name="Password"
                           component="input"
                           type="password"
                           placeholder="Password"/>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default reduxForm({
    form: 'Login',
})(Login)