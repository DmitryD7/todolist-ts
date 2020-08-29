import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {tasksAPI, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type removeTaskActionType = {
    type: "REMOVE_TASK",
    taskId: string
    todolistId: string
}
export type addTaskActionType = {
    type: "ADD_TASK",
    task: TaskType
}
export type updateTaskActionType = {
    type: "UPDATE_TASK",
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
    removeTaskActionType
    | addTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'REMOVE_TASK': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case "ADD_TASK": {
            let stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case "UPDATE_TASK": {
            return ({
                ...state,
                [action.todolistId]: [...state[action.todolistId]].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    ...action.model
                })
            })
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy
        }
        default:
            return state
    }
}
//ACTION CREATORS
export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE_TASK', todolistId, taskId}
}
export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {type: 'ADD_TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): updateTaskActionType => {
    return {type: 'UPDATE_TASK', todolistId, taskId, model}
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET_TASKS", tasks, todolistId} as const
}
//THUNK CREATORS
export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) =>
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                    dispatch(setTasksAC(todolistId, res.data.items))
                }
            )
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then(res => dispatch(addTaskAC(res.data.data.item)))
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(() => dispatch(removeTaskAC(taskId, todolistId)))
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            tasksAPI.updateTask(todolistId, taskId, apiModel)
                .then(() => {
                    dispatch(updateTaskAC(taskId, apiModel, todolistId))
                })
        }
    }
}
