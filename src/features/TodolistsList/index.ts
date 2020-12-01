import {asyncTasksActions as tasksAsyncActions, slice as taskSlice} from './taskReducer/tasks-reducer'
import {asyncTodolistsActions as todolistsAsyncActions, slice as todolistSlice} from './todolistReducer/todolists-reducer'
import {TodolistsList} from './TodolistsList'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

const todolistsReducer = todolistSlice.reducer
const tasksReducer = taskSlice.reducer

export {
    tasksActions,
    todolistsActions,
    TodolistsList,
    todolistsReducer,
    tasksReducer
}