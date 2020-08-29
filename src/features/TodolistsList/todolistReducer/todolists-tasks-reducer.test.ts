import {tasksReducer, TasksStateType} from "../taskReducer/tasks-reducer";
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({id: 'todolistId1', title: "What to learn", addedDate: '', order: 0});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: '1',
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: 'toDoListID1',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
            {
                id: '2',
                title: "JS",
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
                id: '3',
                title: "React",
                status: TaskStatuses.New,
                todoListId: 'toDoListID1',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            }
        ],
        "todolistId2": [
            {
                id: '1',
                title: "bread",
                status: TaskStatuses.New,
                todoListId: 'toDoListID2',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
            {
                id: '2',
                title: "milk",
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
                id: '3',
                title: "tea",
                status: TaskStatuses.New,
                todoListId: 'toDoListID2',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            }
        ]
    };

    const startStateTodo: Array<TodolistDomainType> = [
        {id: 'todolistId1', title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: 'todolistId2', title: "What to buy", filter: "all", addedDate: '', order: 0},
    ]

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)
    const endStateTodo = todolistsReducer(startStateTodo, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(endStateTodo.length).toBe(1);
    expect(endStateTodo[1]).toBeUndefined();
});



