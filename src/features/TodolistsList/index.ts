import {asyncTasksActions as tasksAsyncActions} from './taskReducer/tasks-reducer'
import {asyncTodolistsActions as todolistsAsyncActions, slice} from './todolistReducer/todolists-reducer'
import {TodolistsList} from './TodolistsList'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    todolistsActions,
    TodolistsList
}