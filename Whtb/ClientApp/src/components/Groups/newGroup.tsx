import * as React from "react";
import {Field, reduxForm} from "redux-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";

const NewGroup = (props : any) => {
    const [startDate, setStartDate] = useState(new Date());
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
                           onChange={(date:any) => setStartDate(date)}/>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

interface inputDatePicker{
    onChange: any,
}
const renderDatePicker = ({input : {onChange = () => {}, value=""}}) =>
  <DatePicker
    onChange={onChange}
    selected={!value ? null : new Date(value)}
  />
export default reduxForm({
    form: 'NewGroup',
})(NewGroup)