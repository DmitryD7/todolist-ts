import {v1} from "uuid";
import {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC, FilterValueType,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer} from "../taskReducer/tasks-reducer";
import {RequestStatusType} from "../../../app/appReducer/app-reducer";
import {addTodolist, changeTodolistTitle, getTodolists, removeTodolist} from "./todolists-actions";

let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
    {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
]

test('todolists should be added', () => {
    const action = getTodolists.fulfilled({todolists: startState}, 'requestId');

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist.fulfilled({id: todolistId1}, 'requestId', {todolistId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = "New Todolist";
    const startTasks = {}

    let action = addTodolist.fulfilled({todolist: {id: 'todolistId', title: newTodolistTitle, addedDate: '', order: 0}}, 'requestId', {title: newTodolistTitle})
    const endState = todolistsReducer(startState, action)
    const endStateTasks = tasksReducer(startTasks, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].id).toBe(Object.keys(endStateTasks)[0]);
});

test('correct todolist should change his name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitle.fulfilled({id: todolistId2, title: newTodolistTitle}, 'requestId', {todolistId: todolistId2, newTodolistTitle: newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entityStatus of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({id: todolistId2, status: newStatus}));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});