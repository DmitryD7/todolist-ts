import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useSelector} from "react-redux";
import {TodolistDomainType} from "../todolistReducer/todolists-reducer";
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
    const {addTask, removeTask, updateTask, getTasks} = useActions(tasksActions)
    const {changeTodolistTitle, removeTodolist, changeTodolistFilterAC} = useActions(todolistsActions)

    useEffect(() => {
        if (!demo)
            getTasks(props.todolist.id)
    }, [])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListID: string) =>
        updateTask({taskId, todolistId: toDoListID, domainModel: {status}}), [])
    const changeTaskTitle = useCallback((id: string, title: string, toDoListID: string) =>
        updateTask({taskId: id, todolistId: toDoListID, domainModel: {title}}), [])

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
        changeTaskStatus={changeStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
    />)

    const onAllClickHandler = useCallback(() =>
        changeTodolistFilterAC({id: props.todolist.id, filter: "all"}), [props.todolist.id]);
    const onActiveClickHandler = useCallback(() =>
        changeTodolistFilterAC({id: props.todolist.id, filter: "active"}), [props.todolist.id]);
    const onCompletedClickHandler = useCallback(() =>
        changeTodolistFilterAC({id: props.todolist.id, filter: "completed"}), [props.todolist.id]);
    const onRemoveToDoListHandler = useCallback(() =>
        removeTodolist(props.todolist.id), [props.todolist.id]);
    const onTitleChangeHandler = useCallback((newTitle: string) =>
        changeTodolistTitle({todolistId: props.todolist.id, newTodolistTitle: newTitle}), [props.todolist.id]);
    const onAddItemHandler = useCallback((title: string) =>
        addTask({todolistId: props.todolist.id, title}), [props.todolist.id])


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
                <Button variant={props.todolist.filter === "all" ? "outlined" : "text"}
                        onClick={onAllClickHandler}
                >All</Button>
                <Button variant={props.todolist.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler}
                        color={"primary"}
                >Active </Button>
                <Button variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}
                >Completed</Button>
            </div>
        </div>
    )
})