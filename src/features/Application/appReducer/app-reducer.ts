import {authAPI} from "../../../api/todolist-api";
import {setIsLoggedInAC} from "../../Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));
    } else {
        dispatch(setIsLoggedInAC({value: false}))
    }
})

export const asyncAppActions = {initializeAppTC}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, state => {
            state.isInitialized = true
        })
    }
})

export const {setAppErrorAC, setAppStatusAC} = slice.actions

//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}