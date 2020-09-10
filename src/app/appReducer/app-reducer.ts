const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)


//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType