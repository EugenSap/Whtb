import {purchaseType} from "../../store/groupStore";
import s from "../Group/group.module.css";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import * as React from "react";

const Column = (props: any) => {
    let purchases = props.purchases && props.purchases.length > 0 ? props.purchases : []
    let items = purchases.map((p: purchaseType, index: number) => (
        <Item key={p.id} purchase={p} index={index} id={p.id}/>
    ))

    return (
        <div key={props.id} className={s.user}>
            <div>
                {props.column.title}
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

const Item = (props: any) => {
    let id = props.purchase.id;
    let index = props.index;
    return (
        <div className={s.purchase}>
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        {props.purchase.name}
                    </div>)
                }
            </Draggable>
        </div>
    )
}

export interface columnType {
    id: string,
    title: string,
    purchases: Array<purchaseType>
    purchaseIds: Array<string>
}

export interface stateType {
    purchases: Array<purchaseType>
    columns: Array<columnType>
    columnOrder: Array<string>
}

const Area = (props: any) => {
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

        const start = state.columns.filter((x: columnType) => x.id === source.droppableId)[0];
        const finish = state.columns.filter((x: columnType) => x.id === destination.droppableId)[0];

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
                columns: state.columns.filter((x : columnType) => x.id !== newColumn.id)
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
            columns: state.columns.filter((x : columnType) => x.id !== newStart.id && x.id !== newFinish.id)
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
                        const column = state.columns.filter((x: columnType) => x.id === columnId)[0];
                        const purchases = column.purchaseIds.map(
                            (purchaseId: string) => state.purchases.filter((x: purchaseType) => x.id === purchaseId)[0]);
                        return <Column key={column.id} column={column} purchases={purchases}/>;
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

export default Area;