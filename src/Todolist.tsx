import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteOutline} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

type PropsType = {
    id: string,
    title: string,
    filter: FilterValueType,
};

function TodoList(props: PropsType) {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const createTaskTitle = (title: string) => dispatch(addTaskAC(title, props.id))

    let taskForToDoList = tasks;
    if (props.filter === "active") {
        taskForToDoList = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        taskForToDoList = tasks.filter(t => t.isDone === true)
    }

    let JsxTaskEls = taskForToDoList.map(t => {
            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
            };

            const onTitleChangeCallback = (newTitle: string) => {
                dispatch(changeTaskTitleAC(t.id, newTitle, props.id));
            }

            return (
                <div key={t.id} className={(props.filter === "all" && t.isDone) ? "is-done" : ""}
                     style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}
                >
                    <Checkbox
                        color={"secondary"}
                        checked={t.isDone}
                        onChange={onStatusChangeHandler}
                    />
                    <EditableSpan title={t.title} setNewTitle={onTitleChangeCallback}/>
                    <IconButton
                        onClick={() => dispatch(removeTaskAC(t.id, props.id))}
                        style={{marginLeft: 'auto'}}>
                        <DeleteOutline/>
                    </IconButton>
                </div>
            )
        }
    )

    const onHTitleChangeCallback = (newTitle: string) => dispatch(ChangeTodolistTitleAC(props.id, newTitle));
    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "all"));
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "active"));
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "completed"));
    const onRemoveToDoListHandler = () => dispatch(RemoveTodolistAC(props.id));


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} setNewTitle={onHTitleChangeCallback}/>
                <IconButton onClick={onRemoveToDoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTaskTitle}/>

            <div style={{margin: '20px 0'}}>
                {JsxTaskEls}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        onClick={onAllClickHandler}
                >All</Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler}
                        color={"primary"}
                >Active </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}
                >Completed</Button>
            </div>
        </div>
    )
};

export default TodoList;