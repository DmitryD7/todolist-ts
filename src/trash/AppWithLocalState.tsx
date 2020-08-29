import React, {useState} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterValueType, TodolistDomainType} from "../features/TodolistsList/todolistReducer/todolists-reducer";
import {TasksStateType} from "../features/TodolistsList/taskReducer/tasks-reducer";

export function AppWithLocalState() {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<TodolistDomainType>>([
        {id: toDoListID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: toDoListID2, title: "What to buy", filter: "all", addedDate: '', order: 0},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [toDoListID1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: toDoListID1,
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
                todoListId: toDoListID1,
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
        ],
        [toDoListID2]: [
            {
                id: v1(),
                title: "Cheese",
                status: TaskStatuses.Completed,
                todoListId: toDoListID2,
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
                todoListId: toDoListID2,
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            },
        ],
    });

    function removeTask(id: string, toDoListID: string) {
        let todoListTasks = tasks[toDoListID];
        tasks[toDoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    };

    function changeFilter(id: string, value: FilterValueType) {
        let toDoList = toDoLists.find(tl => tl.id === id);
        if (toDoList) {
            toDoList.filter = value;
            setToDoLists([...toDoLists]);
        }
        ;
    };

    function addTask(title: string, toDoListID: string) {
        let newTask = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: toDoListID,
            priority: TaskPriorities.Low,
            startDate: '',
            addedDate: '',
            deadline: '',
            order: 0,
            description: ''
        };
        let todoListTasks = tasks[toDoListID];
        tasks[toDoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    };

    function changeStatus(taskId: string, status: TaskStatuses, toDoListID: string) {
        let task = tasks[toDoListID].find(t => t.id === taskId);
        if (task) {
            task.status = status;
            setTasks({...tasks});
        }
    };

    function removeToDoList(id: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    };

    function addToDoList(title: string) {
        let newToDoListID = v1();
        let newToDoList: TodolistDomainType = {
            id: newToDoListID,
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
        };
        setToDoLists([newToDoList, ...toDoLists]);
        setTasks({
            ...tasks,
            [newToDoListID]: []
        });
    };

    function changeTaskTitle(id: string, title: string, toDoListID: string) {
        let task = tasks[toDoListID].find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
        ;
    };

    function changeTodosTitle(id: string, title: string) {
        let todoList = toDoLists.find(t => t.id === id);
        if (todoList) {
            todoList.title = title;
            setToDoLists([...toDoLists]);
        }
    };

    /*return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDo-Lists
                    </Typography>
                    {/!*<Button color="inherit">Login</Button>*!/}
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px', margin: '10px'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {toDoLists.map(tl => {
                        let taskForToDoList = tasks[tl.id];
                        if (tl.filter === "active") {
                            taskForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            taskForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                        }
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={taskForToDoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={tl.filter}
                                    removeToDoList={removeToDoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodosTitle={changeTodosTitle}
                                /></Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );*/
}