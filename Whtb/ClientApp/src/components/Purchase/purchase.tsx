import { IPurchaseType, IWithId, IWithIndex, IWithPurchase } from "../../models/interfaces";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import * as React from "react";
import s from "./purchase.module.css";
import Modal from './../modal/Modal';
import PurchaseModal from "../PurchaseModal/Purchase";
import * as PurchaseReducerStore from "../../store/purchaseStore";
import { connect } from 'react-redux'
import {ApplicationState} from "../../store";

interface IItem extends IWithId, IWithPurchase, IWithIndex {
    UpdateData: () => void,
}

interface IFullItem extends IItem {
    requestPurchase: (id: string) => {},
    postPurchase: (purchase: IPurchaseType, UpdateData: () => void) => {},
}

const Purchase = (props: IFullItem) => {
    const [modalActive, setModalActive] = useState(false);

    let onclick = () => {
        props.requestPurchase(props.purchase.id);
        setModalActive(!modalActive)
    }

    let onSubmit = (formData: any) =>
    {
        setModalActive(false)
        let purchase: IPurchaseType = {
            id: props.purchase.id,
            name: formData.name,
            cost: formData.cost,
            user: undefined,
            completed: formData.completed
        }
        props.postPurchase(purchase, props.UpdateData)
    }

    let id = props.purchase.id;
    let index = props.index;

    return (
        <div className={s.purchase} onClick={onclick}>
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        {props.purchase.name}
                        <div>
                            completed : {`${props.purchase.completed}`}
                        </div>
                        <Modal active={modalActive} setActive={setModalActive}>
                            <PurchaseModal onSubmit={onSubmit} />
                        </Modal>
                    </div>)
                }
            </Draggable>
        </div>
    )
}

const mapDispatchToProps = (dispatch : any) => {
    return {
      // dispatching plain actions
      PurchaseReducerStore,
    }
  }

  const mapStateToProps = (state : ApplicationState, ownProps : IItem) => ({
    state: state.group,
    ownProps: ownProps
  })

export default connect(
    mapStateToProps,
    PurchaseReducerStore.actionCreators
)(Purchase as any);
//export default Purchase;