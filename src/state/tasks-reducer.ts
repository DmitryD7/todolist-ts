import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export type removeTaskActionType = {
    type: "REMOVE_TASK",
    taskId: string
    todolistId: string
}
export type addTaskActionType = {
    type: "ADD_TASK",
    title: string
    todolistId: string
}
export type changeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS",
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type changeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE",
    taskId: string
    title: string
    todolistId: string
}

type ActionsType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case "ADD_TASK": {
            let stateCopy = {...state}
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                todoListId: action.todolistId
            }
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            return ({
                ...state,
                [action.todolistId]: [...state[action.todolistId]].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    status: action.status
                })
            })
        }
        case "CHANGE_TASK_TITLE": {
            return ({
                ...state,
                [action.todolistId]: [...state[action.todolistId]].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    title: action.title
                })
            })
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE_TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD_TASK', todolistId, title}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todolistId, taskId, title}
}