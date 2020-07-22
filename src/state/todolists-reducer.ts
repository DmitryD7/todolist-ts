import {FilterValueType, ToDoListType} from "../App";
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

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newToDoList: ToDoListType = {
                id: action.id,
                title: action.title,
                filter: "all"
            };
            return [...state, newToDoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(t => t.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            /*let toDoList = state.find(tl => tl.id === action.id);
            if (toDoList) {
                toDoList.filter = action.filter;
                return [...state]
            }
            return state;*/
            return state.map(tl => {
                if (tl.id === action.id) {
                    tl.filter = action.filter
                }
                return tl;
            })
        default:
            throw new Error("I don't understand this type")
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
