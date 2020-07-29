import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
    isDone: boolean
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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case "ADD_TASK": {
            let stateCopy = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            return ({
                ...state,
                [action.todolistId]: [...state[action.todolistId]].map(t => {
                    if (t.id !== action.taskId) {
                        return t
                    } else {
                        return {...t, isDone: action.isDone}
                    }
                })
            })
        }
        case "CHANGE_TASK_TITLE": {
            return ({
                ...state,
                [action.todolistId]: [...state[action.todolistId]].map(t => {
                    if (t.id !== action.taskId) {
                        return t
                    } else {
                        return {...t, title: action.title}
                    }
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
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todolistId, taskId, title}
}