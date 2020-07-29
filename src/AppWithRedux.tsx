import React from 'react';
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
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValueType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
};

export type TasksStateType = {
    [key: string]: Array<TaskType>,
};

function AppWithRedux() {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function changeFilter(id: string, value: FilterValueType) {
        dispatch(ChangeTodolistFilterAC(id, value))
    };

    function removeToDoList(id: string) {
        let action = RemoveTodolistAC(id)
        dispatch(action)
    };

    function addToDoList(title: string) {
        let action = AddTodolistAC(title)
        dispatch(action)
    };

    function changeTodosTitle(id: string, title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    };

    function removeTask(id: string, toDoListID: string) {
        dispatch(removeTaskAC(id, toDoListID))
    };

    function addTask(title: string, toDoListID: string) {
        dispatch(addTaskAC(title, toDoListID))
    };

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListID))
    };

    function changeTaskTitle(id: string, title: string, toDoListID: string) {
        dispatch(changeTaskTitleAC(id, title, toDoListID))
    };


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDo-Lists
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
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
                                        key={tl.id}
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
    );
};

export default AppWithRedux;
