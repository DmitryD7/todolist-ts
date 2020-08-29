import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter});
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

// THUNK CREATORS
export const setTodolistsTC = () => (dispatch: Dispatch<ActionsType>) =>
    todolistAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) =>
    todolistAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) =>
    todolistAPI.deleteTodolist(todolistId)
        .then(() => dispatch(removeTodolistAC(todolistId)))

export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => (dispatch: Dispatch<ActionsType>) =>
    todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle)
        .then(() => dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle)))

// TYPES
type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>

export type FilterValueType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}