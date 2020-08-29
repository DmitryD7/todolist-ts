import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolistReducer/todolists-reducer";
import {tasksAPI, TaskType, UpdateTaskModelType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS":
            return {...state, [action.todolistId]: action.tasks,}
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD_TASK":
            return {...state,[action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE_TASK":
            return ({...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id !== action.taskId ? t : {...t, ...action.model})})
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy}
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        default:
            return state
    }
}

// ACTION CREATORS
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE_TASK', todolistId, taskId}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD_TASK', task}) as const
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE_TASK', todolistId, taskId, model}) as const
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: "SET_TASKS", tasks, todolistId}) as const

// THUNK CREATORS
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) =>
    tasksAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) =>
    tasksAPI.createTask(todolistId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item)))

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) =>
    tasksAPI.deleteTask(todolistId, taskId)
        .then(() => dispatch(removeTaskAC(taskId, todolistId)))

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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

//TYPES
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>

export type TasksStateType = {
    [key: string]: Array<TaskType>,
};