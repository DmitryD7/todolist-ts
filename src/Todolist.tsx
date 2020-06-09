import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValueType) => void,
    addTask: (title: string) => void,
}


function TodoList(props: PropsType) {

    let [title, setTitle] = useState<string>("");

    let JsxTaskEls = props.tasks.map(t =>
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id)}>x</button>
        </li>);

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    };


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={title}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setTitle(e.currentTarget.value)
                       }}
                       onKeyPress={(e:KeyboardEvent<HTMLInputElement>) => {if (e.charCode === 13){addTask()}}}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {JsxTaskEls}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;