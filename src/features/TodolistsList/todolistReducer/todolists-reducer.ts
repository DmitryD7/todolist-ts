import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../../app/appReducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter});
        case "CHANGE-TODOLIST-STATUS":
            return state.map(tl => tl.id !== action.id ? tl : {...tl, entityStatus: action.status});
        default:
            return state
    }
}

// ACTION CREATORS
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id}) as const
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) =>
    ({type: "CHANGE-TODOLIST-FILTER", filter, id}) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: "SET-TODOLISTS", todolists}) as const
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: "CHANGE-TODOLIST-STATUS", status, id}) as const

// THUNK CREATORS
export const getTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC("idle"))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => (dispatch: ThunkDispatch) =>
    todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))

// TYPES
type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValueType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>