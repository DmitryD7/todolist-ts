import {asyncTasksActions as tasksAsyncActions} from './taskReducer/tasks-reducer'
import {asyncTodolistsActions as todolistsAsyncActions, slice} from './todolistReducer/todolists-reducer'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    todolistsActions
}