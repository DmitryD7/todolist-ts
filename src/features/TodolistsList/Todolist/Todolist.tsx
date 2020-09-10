import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistDomainType
} from "../todolistReducer/todolists-reducer";
import {addTaskTC, getTasksTC, removeTaskTC, updateTaskTC} from "../taskReducer/tasks-reducer";
import {AppRootStateType} from "../../../app/store";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";


type PropsType = {
    demo?: boolean,
    todolist: TodolistDomainType
};

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    useEffect(() => {
        if (!demo)
            dispatch(getTasksTC(props.todolist.id))
    }, [])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch()

    const createTask = useCallback((title: string) => dispatch(addTaskTC(props.todolist.id, title)), [])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListID: string) => {
        dispatch(updateTaskTC(taskId, toDoListID, {status}))
    }, [dispatch]);
    const changeTaskTitle = useCallback((id: string, title: string, toDoListID: string) => {
        dispatch(updateTaskTC(id, toDoListID, {title}))
    }, [dispatch]);
    const removeTask = useCallback((id: string, toDoListID: string) => {
        dispatch(removeTaskTC(id, toDoListID))
    }, [dispatch]);

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

    const onHTitleChangeCallback = useCallback((newTitle: string) => dispatch(changeTodolistTitleTC(props.todolist.id, newTitle)), [dispatch, props.todolist.id]);
    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolist.id, "all")), [dispatch, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolist.id, "active")), [dispatch, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolist.id, "completed")), [dispatch, props.todolist.id]);
    const onRemoveToDoListHandler = useCallback(() => dispatch(removeTodolistTC(props.todolist.id)), [dispatch, props.todolist.id]);


    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} setNewTitle={onHTitleChangeCallback} disabled={props.todolist.entityStatus === "loading"}/>
                <IconButton onClick={onRemoveToDoListHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTask} disabled={props.todolist.entityStatus === "loading"}/>

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