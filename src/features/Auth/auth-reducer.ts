import {authAPI} from "../../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginParamsType} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils";
import {ThunkError} from "../../utils/types";
import {appActions} from "../CommonActions/ApplicationCommonActions";

const {setAppStatus} = appActions

const login = createAsyncThunk<undefined, LoginParamsType, ThunkError>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const logout = createAsyncThunk<undefined, undefined, ThunkError>('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const authAsyncActions = {
    login,
    logout
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })
    }
})