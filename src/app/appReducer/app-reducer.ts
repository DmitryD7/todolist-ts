import {Dispatch} from "redux";
import {authAPI} from "../../api/todolist-api";
import {setIsLoggedInAC} from "../../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case "APP/SET_IS_INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

//ACTIONS
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET_IS_INITIALIZED', isInitialized} as const)

//THUNKS
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            dispatch(setIsLoggedInAC(false))
        }
        dispatch(setIsInitializedAC(true))
    })
}

//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedActionType