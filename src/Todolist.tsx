import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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

    const createTaskTitle = (title:string) => {
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
                <li key={t.id} className={(props.filter === "all" && t.isDone) ? "is-done" : ""}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onStatusChangeHandler}
                    />
                    <EditableSpan title={t.title} setNewTitle={onTitleChangeCallback}/>
                    <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
                </li>
            )
        }
    )

    const onHTitleChangeCallback = (newTitle: string) => {
        props.changeTodosTitle (props.id, newTitle)
    };
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const onRemoveToDoListHandler = () => props.removeToDoList(props.id);
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} setNewTitle={onHTitleChangeCallback}/>
                <button onClick={onRemoveToDoListHandler}>x</button>
            </h3>
            <AddItemForm addItem={createTaskTitle}/>

            <ul>
                {JsxTaskEls}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
};

export default TodoList;