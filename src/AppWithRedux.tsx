import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AddTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddItemForm";


export type FilterValueType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
};

export type TasksStateType = {
    [key: string]: Array<TaskType>,
};

export const AppWithRedux = React.memo(() => {
    console.log('APP')
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addToDoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])

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
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                    /></Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})
