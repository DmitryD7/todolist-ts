import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValueType,
    RemoveTodolistAC,
    SetTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {tasksReducer} from "./tasks-reducer";

let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
    {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0},
]

test('todolists should be added', () => {
    const action = SetTodolistsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = "New Todolist";
    const startTasks = {}

    let action = AddTodolistAC({id: 'todolistId', title: newTodolistTitle, addedDate: '', order: 0})
    const endState = todolistsReducer(startState, action)
    const endStateTasks = tasksReducer(startTasks, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].id).toBe(Object.keys(endStateTasks)[0]);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



