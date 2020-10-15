import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "../todolistReducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolist-api";

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

test('tasks should be added for todolist', () => {
    const action = setTasksAC({todolistId: "todolistId1", tasks: startState["todolistId1"]});

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC({
        todolists: [
            {id: "1", title: "title 1", order: 0, addedDate: ""},
            {id: "2", title: "title 2", order: 0, addedDate: ""}
        ]
    })

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskId: "2", todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    expect(endState["todolistId2"][1].id).toBe("3")
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC(
        {
            todoListId: 'todolistId2',
            title: "juice",
            id: 'id exist',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            addedDate: '',
            deadline: '',
            order: 0,
            description: ''
        });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC({taskId: "2", model: {status: TaskStatuses.New}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC({taskId: "3", model: {title: "coffee"}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe("coffee");
    expect(endState["todolistId1"][2].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    let startTodolist = [] as Array<TodolistDomainType>
    const action = addTodolistAC({todolist: {id: 'todolistId3', title: "What to learn", addedDate: '', order: 0},});
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
    const action = removeTodolistAC({id: 'todolistId2'});
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === "todolistId2");
    if (newKey) {
        throw Error("key don't deleted")
    }

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});