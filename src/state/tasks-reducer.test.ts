import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../AppWithRedux';
import {AddTodolistAC, RemoveTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

test('correct task should be deleted from correct array', () => {
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
                title: "JS",
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

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    expect(endState["todolistId2"][1].id).toBe("3")
});


test('correct task should be added to correct array', () => {
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
                title: "JS",
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

    const action = addTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
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
                title: "JS",
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

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
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

    const action = changeTaskTitleAC("3", "coffee", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe("coffee");
    expect(endState["todolistId1"][2].title).toBe("React");
});


test('new array should be added when new todolist is added', () => {
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
                title: "JS",
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

    let startTodolist = [] as Array<TodolistDomainType>
    const action = AddTodolistAC('newToDoList');
    const endState = tasksReducer(startState, action)
    const endTodolistState = todolistsReducer(startTodolist, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
    expect(endTodolistState[0].id).toBe(newKey);
});

test('tasks array should be deleted when todolist is removed', () => {
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
                title: "JS",
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

    const action = RemoveTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === "todolistId2");
    if (newKey) {
        throw Error("key don't deleted")
    }

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});