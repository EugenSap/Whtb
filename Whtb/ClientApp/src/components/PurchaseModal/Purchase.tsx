import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux'
import * as PurchaseReducerStore from "../../store/purchaseStore";
import {ApplicationState} from "../../store";

const Purchase = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name="user.nick"
                        component="input"
                        type="text"
                        placeholder="Пользователь" />
                </div>
                <div>
                    <Field name="name"
                        component="input"
                        type="text"
                        placeholder="Название" />
                </div>
                <div>
                    <Field name="cost"
                        component="input"
                        type="text"
                        placeholder="цена" />
                </div>
                <div>
                    <label htmlFor="completed">куплено</label>
                    <Field name="completed"
                        component="input"
                        type="checkbox" />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    initialValues: state.purchase?.purchase
  })
  
export default connect(
    mapStateToProps, 
    PurchaseReducerStore.actionCreators
  )(reduxForm({
     form: 'Purchase', // a unique identifier for this form
    enableReinitialize: true
  })(Purchase))  