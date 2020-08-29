import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleTC,
    FilterValueType,
    RemoveTodolistTC
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, setTasksTC, updateTaskTC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";


type PropsType = {
    id: string,
    title: string,
    filter: FilterValueType,
};

export const TodoList = React.memo((props: PropsType) => {
    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const createTask = useCallback((title: string) => dispatch(addTaskTC(props.id, title)), [])
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
    if (props.filter === "active") {
        taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    let JsxTaskEls = taskForToDoList.map(t => <Task
        key={t.id}
        task={t}
        todoListId={props.id}
        changeTaskStatus={changeStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
    />)

    const onHTitleChangeCallback = useCallback((newTitle: string) => dispatch(ChangeTodolistTitleTC(props.id, newTitle)), [dispatch, props.id]);
    const onAllClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(props.id, "all")), [dispatch, props.id]);
    const onActiveClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(props.id, "active")), [dispatch, props.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(props.id, "completed")), [dispatch, props.id]);
    const onRemoveToDoListHandler = useCallback(() => dispatch(RemoveTodolistTC(props.id)), [dispatch, props.id]);


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} setNewTitle={onHTitleChangeCallback}/>
                <IconButton onClick={onRemoveToDoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTask}/>

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
})