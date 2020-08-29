import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "./todolist-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((response) => {
            const data = response.data
            setState(data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const onCreateTodoList = () => {
        todolistAPI.createTodolist(title)
            .then(response => {
                setState(response.data)
            })
    }
    return <>
        <input value={title} onChange={e => setTitle(e.currentTarget.value)} placeholder={'title'}/>
        <button onClick={onCreateTodoList}>Create ToDo</button>
        <div> {JSON.stringify(state)}</div>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const onTodoListDelete = () => {
        todolistAPI.deleteTodolist(todoListId)
            .then((response) => {
                setState(response.data)
            })
        setTodoListId('')
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)} placeholder={'todolistId'}/>
        <button onClick={onTodoListDelete}>Delete todoList</button>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onUpdateTodoList = () => {
        todolistAPI.updateTodolistTitle(todoListId, title)
            .then(res => {
                setState(res.data)
            })
        setTitle('')
        setTodoListId('')
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'TodoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'TodoList Title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={onUpdateTodoList}>Update TodoList</button>
    </>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const onGetTasks = () => {
        tasksAPI.getTasks(todolistId).then((response) => {
            setState(response.data)
        })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}/>
        <button onClick={onGetTasks}>Get tasks</button>
    </>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onCreateTask = () => {
        tasksAPI.createTask(todoListId, title).then((response) => {
            setState(response.data)
        })
        setTitle('')
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={onCreateTask}>Create Task</button>
    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const onDeleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId).then((response) => {
            setState(response.data)
        })
        setTaskId("")
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'TodoListId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'TaskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={onDeleteTask}>Delete Task</button>
    </>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const taskModel = {
        title: title,
        description: 'reducers',
        status: 0,
        priority: 2,
        startDate: '',
        deadline: '',
    }

    const onTaskUpdate = () => {
        tasksAPI.updateTask(todolistId, taskId, taskModel).then((response) => {
            setState(response.data)
        })
        setTitle('')
        setTaskId('')
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'TodoListId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'TaskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'Task title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={onTaskUpdate}>Update Task</button>
    </>
}