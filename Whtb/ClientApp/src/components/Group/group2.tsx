import s from "./group.module.css"
import * as React from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as GroupReducerStore from "../../store/groupStore";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {groupType, purchaseType} from "../../store/groupStore";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {userType} from "../../store/friendsStore";

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

interface columnType {
    id: string,
    title: string,
    purchases: Array<purchaseType>
    purchaseIds: Array<string>
}

interface stateType {
    purchases: Array<purchaseType>
    columns: Array<columnType>
    columnOrder: Array<string>
}

const Area = (props: any) => {
    let state = props.state;

    if (!state) {
        return <div className={s.group}>Group</div>
    }
    //const onDragEnd = () =>{}
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
                //[newColumn.id] : newColumn
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
        props.setState(newState);
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

const Group2 = (props: any) => {
    const {id} = useParams();

    useEffect(() => {
        props.requestGroup(id, id);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const group: groupType | undefined = props.state.group;
        if (!group) {
            ;
        } else {
            let columns: Array<columnType> = props.state.group.users.map((u : userType) => ({
                id: u.id,
                title: u.nick,
                purchases: props.state.group.purchases.filter((p : purchaseType) => p.user === u.id).map((p : purchaseType)  => p),
                purchaseIds: props.state.group.purchases.filter((p : purchaseType)  => p.user === u.id).map((p : purchaseType)  => p.id),

            }));
            let columnOrder: Array<string> = group.users.map(u => u.id);

            let st: stateType = {
                purchases: props.state.group.purchases,
                columns: columns,
                columnOrder: columnOrder
            };
            setState(st)
        }
    }, [props.state.group])

    let initialState: stateType = {
        purchases: [],
        columns: [],
        columnOrder: []
    };
    let [state, setState1] = useState(initialState);
    let setState = (st : stateType) => {
        setState1(st);
    }
    //setState(st)
    return <Area setState={setState} state={state}/>;
}

export default connect(
    (state: ApplicationState) => ({state: state.group}), // Selects which state properties are merged into the component's props
    GroupReducerStore.actionCreators // Selects which action creators are merged into the component's props
)(Group2 as any);