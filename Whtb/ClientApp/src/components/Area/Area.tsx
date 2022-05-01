import s from "../Group/group.module.css";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import * as React from "react";
import { IColumnType, IPurchasesArrayType, IPurchaseType, IStateType, IWithId, IWithIndex, IWithPurchase } from "../../models/interfaces";
import Purchase from './../Purchase/purchase';

interface IColumn extends IPurchasesArrayType, IWithId{
    column: IColumnType,
    updateData: () => {}
}

const Column = (props: IColumn) => {
    let updateData = () => {
        props.updateData();
    }
    let purchases = props.purchases && props.purchases.length > 0 ? props.purchases : []
    let items = purchases.map((p: IPurchaseType, index: number) => (
        <Purchase key={p.id} purchase={p} index={index} id={p.id} UpdateData = {updateData}/>
    ))
    
    return (
        <div key={props.id} className={s.user}>
            <div>
                {props.column.title}
                sum : {props.column.summ}
            </div>
            {<Droppable droppableId={props.column.id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>}
        </div>
    )
}

interface IArea {
    state: IStateType,
    setState: (arg0: IStateType) => void,
    assignPurchase: (arg0: string, arg1: string) => void,
    updateData: () => {}
}

const Area = (props: IArea) => {
    let state = props.state;

    if (!state) {
        return <div className={s.group}>Group</div>
    }

    const onDragEnd = (result: any) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.columns.filter((x: IColumnType) => x.id === source.droppableId)[0];
        const finish = state.columns.filter((x: IColumnType) => x.id === destination.droppableId)[0];

        if (start === finish) {
            const newTaskIds = start.purchaseIds;
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                purchaseIds: newTaskIds,
            };
            const newState = {
                ...state,
                columns: state.columns.filter((x : IColumnType) => x.id !== newColumn.id)
            };
            newState.columns.push(newColumn)
            props.setState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = start.purchaseIds;
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            purchaseIds: startTaskIds,
        };

        const finishTaskIds = finish.purchaseIds;
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            purchaseIds: finishTaskIds,
        };

        const newState = {
            ...state,
            columns: state.columns.filter((x : IColumnType) => x.id !== newStart.id && x.id !== newFinish.id)
        };
        newState.columns.push(newStart)
        newState.columns.push(newFinish)
        props.assignPurchase(newFinish.id, draggableId);
    };

    return (
        <div className={s.group2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    {state.columnOrder.map((columnId: string) => {
                        const column = state.columns.filter((x: IColumnType) => x.id === columnId)[0];
                        const purchases = column.purchaseIds.map(
                            (purchaseId: string) => state.purchases.filter((x: IPurchaseType) => x.id === purchaseId)[0]);
                        return <Column key={column.id} id ={column.id} column={column} purchases={purchases} updateData ={props.updateData} />;
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

export default Area;