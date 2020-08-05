import {FilterValueType, ToDoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    id: string
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

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

const initialState: Array<ToDoListType> = []

export const todolistsReducer = (state: Array<ToDoListType> = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newToDoList: ToDoListType = {
                id: action.id,
                title: action.title,
                filter: "all"
            };
            return [newToDoList, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id !== action.id ? todo : {...todo, title: action.title})
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id !== action.id ? todo : {...todo, filter: action.filter});
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: newTodolistTitle, id: v1()}
}

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTodolistTitle}
}

export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todolistId}
}
