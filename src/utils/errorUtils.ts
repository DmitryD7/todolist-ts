import {setAppErrorAC, setAppStatusAC,} from "../app/appReducer/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";
import {AxiosError} from "axios";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}
export const handleAsyncServerAppError = <T>(data: CommonResponseType<T>, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}