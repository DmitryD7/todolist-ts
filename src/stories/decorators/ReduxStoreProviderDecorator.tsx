import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, RootReducerType} from "../../app/store";
import {todolistsReducer} from "../../features/TodolistsList/todolistReducer/todolists-reducer";
import {tasksReducer} from "../../features/TodolistsList/taskReducer/tasks-reducer";
import {combineReducers} from "redux";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/appReducer/app-reducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'toDoListID1', title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: 'toDoListID2', title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "loading"},
    ],
    tasks: {
        ["toDoListID1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: 'toDoListID1',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                todoListId: 'toDoListID1',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
        ],
        ["toDoListID2"]: [
            {
                id: v1(),
                title: "Cheese",
                status: TaskStatuses.Completed,
                todoListId: 'toDoListID2',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
            {
                id: v1(),
                title: "Apples",
                status: TaskStatuses.New,
                todoListId: 'toDoListID2',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
        ]
    },
    app: {
        status: "succeeded",
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}
export const HashRouterDecorator = (storyFn: any) => {
    return <HashRouter>
        {storyFn()}
    </HashRouter>
}
