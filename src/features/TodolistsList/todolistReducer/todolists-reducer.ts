import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {RequestStatusType, setAppStatusAC,} from "../../../app/appReducer/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
    handleServerNetworkError
} from "../../../utils/errorUtils";
import {ThunkError} from "../../../app/store";

const getTodolists = createAsyncThunk('todoLists/getTodolists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: "idle"}))
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>('todoLists/addTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const removeTodolist = createAsyncThunk('todoLists/removeTodolist', async (todolistId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
    const res = await todolistAPI.deleteTodolist(todolistId)
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
const changeTodolistTitle = createAsyncThunk('todoLists/changeTodolistTitle', async (param: { todolistId: string, newTodolistTitle: string }, thunkAPI) => {
    const res = await todolistAPI.updateTodolistTitle(param.todolistId, param.newTodolistTitle)
    try {
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
export const todolistsReducer = slice.reducer

// TYPES
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}