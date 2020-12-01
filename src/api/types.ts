// TYPES
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FieldErrorType = {
    field: string
    error: string
}
export type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors?: Array<FieldErrorType>
    messages: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
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
export type AuthMeResponseDataType = {
    id: number
    email: string
    login: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}