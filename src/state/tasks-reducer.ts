import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
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
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
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
            const task  = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...task]
            stateCopy[action.task.todoListId] = newTasks
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
export const addTaskAC = (todolistId: string, task: TaskType): addTaskActionType => {
    return {type: 'ADD_TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todolistId, taskId, title}
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
            .then(res => dispatch(addTaskAC(todolistId, res.data.data.item)))
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(() => dispatch(removeTaskAC(taskId, todolistId)))
    }
}
export const changeTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}
export const changeTaskTitleTC = (taskId: string, todolistId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                const action = changeTaskTitleAC(taskId, title, todolistId)
                dispatch(action)
            })
        }
    }
}
