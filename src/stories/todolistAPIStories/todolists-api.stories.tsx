import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "../../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists().then((response) => {
            const data = response.data
            setState(data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('REACT-redux')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '25388039-af86-4ee1-b8ec-65daa902a6b3'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '4843d069-2ac1-44ff-8580-1bb8e172ffe5'
    useEffect(() => {
        todolistAPI.updateTodolistTitle(todolistId, "AXIOS")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '036b8997-7ebe-4126-aec6-0e52d29a1c45'
    useEffect(() => {
        tasksAPI.getTasks(todolistId).then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '036b8997-7ebe-4126-aec6-0e52d29a1c45'
    useEffect(() => {
        tasksAPI.createTask(todolistId, 'GraphQL').then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '036b8997-7ebe-4126-aec6-0e52d29a1c45'
    const taskId = '9f2b93a1-bb55-4da8-8245-eaa60ad37923'
    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId).then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '036b8997-7ebe-4126-aec6-0e52d29a1c45'
    const taskId = '4bd8a5e0-35f7-4e6a-972c-e653e8facea0'
    const taskModel = {
        title: "redux",
        description: 'reducers',
        status: 0,
        priority: 2,
        startDate: '',
        deadline: '',
    }
    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, taskModel).then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}