import {todolistAPI} from "../../../api/todolist-api";
import {RequestStatusType} from "../../Application";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../../utils/errorUtils";
import {ThunkError} from "../../../utils/types";
import {TodolistType} from "../../../api/types";
import {appActions} from "../../CommonActions/ApplicationCommonActions";

const {setAppStatus} = appActions

const getTodolists = createAsyncThunk<{todolists: Array<TodolistType>}, undefined, ThunkError>('todoLists/getTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        thunkAPI.dispatch(setAppStatus({status: "idle"}))
        return {todolists: res.data}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>('todoLists/addTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const removeTodolist = createAsyncThunk<{id: string}, string, ThunkError>('todoLists/removeTodolist', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {id: todolistId}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const changeTodolistTitle = createAsyncThunk<{id: string, title: string}, { todolistId: string, newTodolistTitle: string }, ThunkError>('todoLists/changeTodolistTitle', async (param, thunkAPI) => {
    try {
        const res = await todolistAPI.updateTodolistTitle(param.todolistId, param.newTodolistTitle)
        if (res.data.resultCode === 0) {
            return {id: param.todolistId, title: param.newTodolistTitle}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncTodolistsActions = {
    getTodolists,
    addTodolist,
    removeTodolist,
    changeTodolistTitle
}

export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValueType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })
    }
})

export const {changeTodolistEntityStatusAC, changeTodolistFilterAC} = slice.actions

// TYPES
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}