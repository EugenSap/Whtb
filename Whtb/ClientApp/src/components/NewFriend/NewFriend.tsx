import * as React from "react";
import {Field, reduxForm} from "redux-form";

const NewFriend = (props : any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name="id"
                           component="input"
                           type="text"
                           placeholder="Id"/>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default reduxForm({
    form: 'NewFriend',
})(NewFriend)