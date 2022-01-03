import * as React from "react";
import {Field, reduxForm} from "redux-form";

const NewPurchase = (props : any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name="name"
                           component="input"
                           type="text"
                           placeholder="Название"/>
                </div>
                <div>
                    <Field name="cost"
                           component="input"
                           type="text"
                           placeholder="цена"/>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default reduxForm({
    form: 'NewPurchase',
})(NewPurchase)