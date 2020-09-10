import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./appReducer/app-reducer";

type AppPropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false, ...props}: AppPropsType) => {
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
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
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
        <Container fixed>
            <TodolistsList demo={demo}/>
        </Container>
    </div>
})