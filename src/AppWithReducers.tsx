import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValueType,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>,
};

function AppWithReducers() {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, dispatchTodolistReducer] = useReducer(todolistsReducer, [
        {id: toDoListID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: toDoListID2, title: "What to buy", filter: "all", addedDate: '', order: 0},
    ]);

    let [tasks, dispatchTasksReducer] = useReducer( tasksReducer ,{
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

    function changeFilter(id: string, value: FilterValueType) {
        dispatchTodolistReducer(ChangeTodolistFilterAC(id, value))
    };

    function removeToDoList(id: string) {
        let action = RemoveTodolistAC(id)
        dispatchTodolistReducer(action)
        dispatchTasksReducer(action)
    };

    function addToDoList(title: string) {
        /*let action = AddTodolistAC(title)
        dispatchTodolistReducer(action)
        dispatchTasksReducer(action)*/
    };

    function changeTodosTitle(id: string, title: string) {
        dispatchTodolistReducer(ChangeTodolistTitleAC(id, title))
    };

    function removeTask(id: string, toDoListID: string) {
        dispatchTasksReducer(removeTaskAC(id, toDoListID))
    };

    // function addTask(title: string, toDoListID: string) {
    //     dispatchTasksReducer(addTaskAC(title, toDoListID))
    // };

    function changeStatus(taskId: string, status: TaskStatuses, toDoListID: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, status, toDoListID))
    };

    function changeTaskTitle(id: string, title: string, toDoListID: string) {
        dispatchTasksReducer(changeTaskTitleAC(id, title, toDoListID))
    };

/*    return (
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
};

export default AppWithReducers;
