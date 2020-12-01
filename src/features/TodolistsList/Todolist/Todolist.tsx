import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, Paper, PropTypes} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useSelector} from "react-redux";
import {FilterValueType, TodolistDomainType} from "../todolistReducer/todolists-reducer";
import {AppRootStateType, useActions, useAppDispatch} from "../../../app/store";
import {AddItemForm, AddItemFormSubmitHelpersType} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {tasksActions, todolistsActions} from "../index";

type PropsType = {
    demo?: boolean,
    todolist: TodolistDomainType
};

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolist.id])
    const {getTasks} = useActions(tasksActions)
    const {changeTodolistTitle, removeTodolist, changeTodolistFilterAC} = useActions(todolistsActions)
    const dispatch = useAppDispatch()

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

    const onAddItemHandler = useCallback(async (title: string, helper: AddItemFormSubmitHelpersType) => {
        let thunk = tasksActions.addTask({todolistId: props.todolist.id, title})
        const resultAction = await dispatch(thunk)
        if (tasksActions.addTask.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [])

    const renderFilterButton = (buttonFilter: FilterValueType,
                                color: PropTypes.Color,
                                text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? "outlined" : "text"}
                       onClick={() => onFilterButtonClickHandler(buttonFilter)}
                       color={color}
        >{text}</Button>
    }

    return (
        <Paper style={{position: 'relative', padding: '10px'}}>
            <IconButton onClick={onRemoveToDoListHandler}
                        disabled={props.todolist.entityStatus === "loading"}
                        style={{position: 'absolute', right: '9px', padding: '3px'}}
                        size={"small"}
            >
                <Delete fontSize={"small"}/>
            </IconButton>
            <h3>
                <EditableSpan title={props.todolist.title} setNewTitle={onTitleChangeHandler}
                              disabled={props.todolist.entityStatus === "loading"}/>
            </h3>
            <AddItemForm addItem={onAddItemHandler} disabled={props.todolist.entityStatus === "loading"}/>

            <div style={{margin: '20px 0'}}>
                {JsxTaskEls}
                {!taskForToDoList.length && <div style={{padding: '10px', color: 'grey'}}>No tasks</div>}
            </div>
            <div>
                {renderFilterButton("all", "default", "All")}
                {renderFilterButton("active", "primary", "Active")}
                {renderFilterButton("completed", "secondary", "Completed")}
            </div>
        </Paper>
    )
})