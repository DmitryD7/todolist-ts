import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

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
};

function TodoList(props: PropsType) {

    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    let JsxTaskEls = props.tasks.map(t => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                props.changeStatus(t.id, newIsDoneValue, props.id);
            };
            return (
                <li key={t.id} className={(props.filter === "all" && t.isDone) ? "is-done" : ""}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeHandler}
                    />
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
                </li>
            )
        }
    )

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id);
        } else {
            setError("Field is required!")
        }
        setTitle("");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    };

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const onRemoveToDoListHandler = () => props.removeToDoList(props.id);
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onRemoveToDoListHandler}>x</button>
            </h3>
            <div>
                <input type="text"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
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