import * as React from "react";
import {Field, reduxForm} from "redux-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IWithHandleSubmit } from "../../models/interfaces";

const NewGroup = (props : IWithHandleSubmit) => {
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
                    <Field name="date"
                           component={renderDatePicker}
                           />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

const renderDatePicker = ({input : {onChange = () => {}, value=""}}) =>
  <DatePicker
    onChange={onChange}
    selected={!value ? null : new Date(value)}
  />
export default reduxForm({
    form: 'NewGroup',
})(NewGroup)