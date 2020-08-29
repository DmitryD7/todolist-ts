import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValueType,
    id: string
}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS"
    todolists: Array<TodolistType>
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type FilterValueType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id !== action.id ? todo : {...todo, title: action.title})
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id !== action.id ? todo : {...todo, filter: action.filter});
        default:
            return state
    }
}

//ACTION CREATORS
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", todolist}
}
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTodolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todolistId}
}
export const SetTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists}
}

//THUNK CREATORS
export const setTodolistsTC = () => {
    return (dispatch: Dispatch) =>
        //1 server request
        todolistAPI.getTodolists()
            .then((res) => {
                //2 dispatch actions
                dispatch(SetTodolistsAC(res.data))
            })
}
export const AddTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => dispatch(AddTodolistAC(res.data.data.item)))
    }
}
export const RemoveTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) =>
        todolistAPI.deleteTodolist(todolistId)
            .then(() => dispatch(RemoveTodolistAC(todolistId)))
}
export const ChangeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => {
    return (dispatch: Dispatch) =>
        todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle)
            .then(() => dispatch(ChangeTodolistTitleAC(todolistId, newTodolistTitle)))
}