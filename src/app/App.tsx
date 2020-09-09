import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";

export const App = React.memo(() => {
    return <div className="App">
        <AppBar position="static">
            <ErrorSnackbar/>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    ToDo-Lists
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            <LinearProgress />
        </AppBar>
        <Container fixed>
            <TodolistsList/>
        </Container>
    </div>
})