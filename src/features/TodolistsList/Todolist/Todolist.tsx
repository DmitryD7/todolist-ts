import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, PropTypes} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useSelector} from "react-redux";
import {FilterValueType, TodolistDomainType} from "../todolistReducer/todolists-reducer";
import {AppRootStateType, useActions} from "../../../app/store";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {tasksActions, todolistsActions} from "../index";

type PropsType = {
    demo?: boolean,
    todolist: TodolistDomainType
};

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolist.id])
    const {addTask, getTasks} = useActions(tasksActions)
    const {changeTodolistTitle, removeTodolist, changeTodolistFilterAC} = useActions(todolistsActions)

    useEffect(() => {
        if (!demo)
            getTasks(props.todolist.id)
    }, [])

    let taskForToDoList = tasks;
    if (props.todolist.filter === "active") {
        taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    let JsxTaskEls = taskForToDoList.map(t => <Task
        key={t.id}
        task={t}
        todoListId={props.todolist.id}
    />)

    const onFilterButtonClickHandler = useCallback((buttonFilter: FilterValueType) =>
        changeTodolistFilterAC({id: props.todolist.id, filter: buttonFilter}), [props.todolist.id]);

    const onRemoveToDoListHandler = useCallback(() =>
        removeTodolist(props.todolist.id), [props.todolist.id]);

    const onTitleChangeHandler = useCallback((newTitle: string) =>
        changeTodolistTitle({todolistId: props.todolist.id, newTodolistTitle: newTitle}), [props.todolist.id]);

    const onAddItemHandler = useCallback((title: string) =>
        addTask({todolistId: props.todolist.id, title}), [props.todolist.id])

    const renderFilterButton = (buttonFilter: FilterValueType,
                                color: PropTypes.Color,
                                text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? "outlined" : "text"}
                       onClick={() => onFilterButtonClickHandler(buttonFilter)}
                       color={color}
        >{text}</Button>
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} setNewTitle={onTitleChangeHandler}
                              disabled={props.todolist.entityStatus === "loading"}/>
                <IconButton onClick={onRemoveToDoListHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={onAddItemHandler} disabled={props.todolist.entityStatus === "loading"}/>

            <div style={{margin: '20px 0'}}>
                {JsxTaskEls}
            </div>
            <div>
                {renderFilterButton("all", "default", "All")}
                {renderFilterButton("active", "primary", "Active")}
                {renderFilterButton("completed", "secondary", "Completed")}
            </div>
        </div>
    )
})