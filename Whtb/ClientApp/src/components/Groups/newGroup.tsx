import * as React from "react";
import {Field, reduxForm} from "redux-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewGroup = (props : any) => {
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