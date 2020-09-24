import {tasksAPI, TaskType, UpdateTaskModelType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {setAppStatusAC} from "../../../app/appReducer/app-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolistReducer/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => state[tl.id] = [])
        })
    }
})

export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

export const tasksReducer = slice.reducer

// THUNK CREATORS
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({taskId, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            tasksAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId, model, todolistId}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(error => handleServerNetworkError(error, dispatch))
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

export type TasksStateType = {
    [key: string]: Array<TaskType>,
};