import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC,} from "../../../app/appReducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
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
    }
})

export const {changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC, addTodolistAC, removeTodolistAC, setTodolistsAC} = slice.actions

export const todolistsReducer = slice.reducer

// THUNK CREATORS
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: "idle"}))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => (dispatch: Dispatch) =>
    todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: todolistId, title: newTodolistTitle}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))

// TYPES

export type FilterValueType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}