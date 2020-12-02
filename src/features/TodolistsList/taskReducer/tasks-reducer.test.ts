import {slice as tasksSlice, TasksStateType,} from './tasks-reducer';
import {slice as todolistsSlice, TodolistDomainType} from "../todolistReducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/types";
import {tasksActions, todolistsActions} from "../index";

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
const {addTask, getTasks, removeTask, updateTask} = tasksActions
const {addTodolist, getTodolists, removeTodolist} = todolistsActions

test('tasks should be added for todolist', () => {
    const action = getTasks.fulfilled({
        todolistId: "todolistId1",
        tasks: startState["todolistId1"]
    }, 'requestId', "todolistId1");

    const endState = tasksSlice.reducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})

test('empty arrays should be added when we set todolists', () => {
    const action = getTodolists.fulfilled({
        todolists: [
            {id: "1", title: "title 1", order: 0, addedDate: ""},
            {id: "2", title: "title 2", order: 0, addedDate: ""}
        ]
    }, 'requestId', undefined)

    const endState = tasksSlice.reducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('correct task should be deleted from correct array', () => {
    const param = {taskId: "2", todolistId: "todolistId2"};
    const action = removeTask.fulfilled(param, 'requestId', param);

    const endState = tasksSlice.reducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    expect(endState["todolistId2"][1].id).toBe("3")
});

test('correct task should be added to correct array', () => {
    const task = {
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
    }
    const action = addTask.fulfilled(
        task, 'requestId', {title: task.title, todolistId: task.todoListId});

    const endState = tasksSlice.reducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const updateModel = {taskId: "2", domainModel: {status: TaskStatuses.New}, todolistId: "todolistId2"};
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksSlice.reducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    const updateModel = {taskId: "3", domainModel: {title: "coffee"}, todolistId: "todolistId2"};
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksSlice.reducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe("coffee");
    expect(endState["todolistId1"][2].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    let startTodolist = [] as Array<TodolistDomainType>
    const action = addTodolist.fulfilled({
        todolist: {
            id: 'todolistId3',
            title: "What to learn",
            addedDate: '',
            order: 0
        }
    }, 'requestId', "What to learn");
    const endState = tasksSlice.reducer(startState, action)
    const endTodolistState = todolistsSlice.reducer(startTodolist, action)

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
    const action = removeTodolist.fulfilled({id: 'todolistId2'}, 'requestId', 'todolistId2');
    const endState = tasksSlice.reducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === "todolistId2");
    if (newKey) {
        throw Error("key don't deleted")
    }

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});