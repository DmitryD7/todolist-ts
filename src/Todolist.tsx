import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteOutline} from '@material-ui/icons';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, toDoListID: string) => void,
    changeFilter: (id: string, value: FilterValueType) => void,
    addTask: (title: string, toDoListID: string) => void,
    changeStatus: (taskId: string, isDone: boolean, toDoListID: string) => void,
    filter: FilterValueType,
    removeToDoList: (id: string) => void,
    changeTaskTitle: (id: string, title: string, toDoListID: string) => void,
    changeTodosTitle: (id: string, title: string) => void,
};

function TodoList(props: PropsType) {

    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id)
    }


    let JsxTaskEls = props.tasks.map(t => {
            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                props.changeStatus(t.id, newIsDoneValue, props.id);
            };

            const onTitleChangeCallback = (newTitle: string) => {
                props.changeTaskTitle(t.id, newTitle, props.id);
            }

            return (
                <div key={t.id} className={(props.filter === "all" && t.isDone) ? "is-done" : ""}
                     style={{display: 'flex',alignItems: 'center',  justifyContent: 'end'}}
                >
                    <Checkbox
                        color={"secondary"}
                        checked={t.isDone}
                        onChange={onStatusChangeHandler}
                    />
                    <EditableSpan title={t.title} setNewTitle={onTitleChangeCallback}/>
                    <IconButton
                        onClick={() => props.removeTask(t.id, props.id)}
                        style={{marginLeft: 'auto'}}>
                        <DeleteOutline/>
                    </IconButton>
                </div>
            )
        }
    )

    const onHTitleChangeCallback = (newTitle: string) => {
        props.changeTodosTitle(props.id, newTitle)
    };
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const onRemoveToDoListHandler = () => props.removeToDoList(props.id);
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