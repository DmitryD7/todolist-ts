import {AxiosError} from "axios";
import {CommonResponseType} from "../api/types";
import {appActions} from "../features/CommonActions/ApplicationCommonActions";

const {setAppError, setAppStatus} = appActions

export const handleAsyncServerAppError = <T>(data: CommonResponseType<T>, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}