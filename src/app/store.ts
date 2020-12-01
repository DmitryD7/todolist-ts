import {tasksReducer, todolistsReducer} from '../features/TodolistsList';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./appReducer/app-reducer";
import {authReducer} from "../features/Auth";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {FieldErrorType} from "../api/todolist-api";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export type RootReducerType = typeof rootReducer

// непосредственно создаём store
export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
    }
)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>> (actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}

export type ThunkError =  {
    rejectValue:
        {
            errors: Array<string>,
            fieldsErrors?: Array<FieldErrorType>
        }
}