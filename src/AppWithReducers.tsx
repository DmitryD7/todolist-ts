import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValueType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
};

export type TasksStateType = {
    [key: string]: Array<TaskType>,
};

function AppWithReducers() {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, dispatchTodolistReducer] = useReducer(todolistsReducer, [
        {id: toDoListID1, title: "What to learn", filter: "all"},
        {id: toDoListID2, title: "What to buy", filter: "all"},
    ]);

    let [tasks, dispatchTasksReducer] = useReducer( tasksReducer ,{
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [toDoListID2]: [
            {id: v1(), title: "Cheese", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bananas", isDone: true},
            {id: v1(), title: "Apples", isDone: false},
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
        let action = AddTodolistAC(title)
        dispatchTodolistReducer(action)
        dispatchTasksReducer(action)
    };

    function changeTodosTitle(id: string, title: string) {
        dispatchTodolistReducer(ChangeTodolistTitleAC(id, title))
    };


    function removeTask(id: string, toDoListID: string) {
        dispatchTasksReducer(removeTaskAC(id, toDoListID))
    };

    function addTask(title: string, toDoListID: string) {
        dispatchTasksReducer(addTaskAC(title, toDoListID))
    };

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, toDoListID))
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
