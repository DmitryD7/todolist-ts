import {authAPI} from "../../../api/todolist-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authActions} from "../../Auth";
import {appActions} from "../../CommonActions/ApplicationCommonActions";

const {setIsLoggedInAC} = authActions
const {setAppStatus, setAppError} = appActions

const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));
    } else {
        dispatch(setIsLoggedInAC({value: false}))
    }
})

export const asyncAppActions = {initializeApp}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, state => {
            state.isInitialized = true
        })
        builder.addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status
        })
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error
        })
    }
})
//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}