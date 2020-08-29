import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e25ce395-7836-43e0-9416-1f8978f20c93'
    },
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed= 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle= 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    todoListId: string
    title: string
    id: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    addedDate: string
    deadline: string
    order: number
    description: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type GetTasksResponseType = {
    error: null | string
    items: Array<TaskType>
    totalCount: number
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodolistType}>>(`todo-lists/`, {title})
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
        return instance.post<CommonResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, properties: UpdateTaskModelType) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, properties)
    },
}