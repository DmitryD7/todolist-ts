import axios from 'axios'
import {
    AuthMeResponseDataType,
    CommonResponseType,
    GetTasksResponseType,
    LoginParamsType,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from "./types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fb959993-6c4d-4ae3-923f-a4e9c807c0d9',
        origin: 'http://localhost:3000'
    },
})

// API
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>(`todo-lists/`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${id}`, {title})
    },
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, properties: UpdateTaskModelType) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, properties)
    },
}

export const authAPI = {
    me() {
        return instance.get<CommonResponseType<AuthMeResponseDataType>>(`auth/me`)
    },
    logout() {
        return instance.delete<CommonResponseType>(`auth/login`)
    },
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{ id?: number }>>(`auth/login`, data)
    }
}