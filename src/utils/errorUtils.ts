import {
    setAppErrorAC,
    setAppStatusAC,
} from "../app/appReducer/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: "failed"}))
}