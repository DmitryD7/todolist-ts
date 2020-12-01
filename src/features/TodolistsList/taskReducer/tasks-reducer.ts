import {tasksAPI} from "../../../api/todolist-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {asyncTodolistsActions} from "../todolistReducer/todolists-reducer";
import {appActions} from "../../Application";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../utils/errorUtils";
import {AppRootStateType, ThunkError} from "../../../utils/types";
import {TaskType, UpdateTaskModelType} from "../../../api/types";

const getTasks = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    const res = await tasksAPI.getTasks(todolistId)
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
    return {todolistId, tasks: res.data.items}
})
const removeTask = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    await tasksAPI.deleteTask(param.todolistId, param.taskId)
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
    return {taskId: param.taskId, todolistId: param.todolistId}
})
const addTask = createAsyncThunk<TaskType, { todolistId: string, title: string }, ThunkError>
('tasks/ addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        const res = await tasksAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...param.domainModel
        }
        const res = await tasksAPI.updateTask(param.todolistId, param.taskId, model)
        try {
            if (res.data.resultCode === 0) {
                return param
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    }
})

export const asyncTasksActions = {
    getTasks,
    removeTask,
    addTask,
    updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodolistsActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(asyncTodolistsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(asyncTodolistsActions.getTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => state[tl.id] = [])
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload?.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            }
        })
    }
})
//TYPES
export type TasksStateType = {
    [key: string]: Array<TaskType>,
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}