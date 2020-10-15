import React, {useCallback, useEffect} from "react";
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "./todolistReducer/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";

type TodolistsListPropsType = {
    demo?: boolean
}

export function TodolistsList({demo = false, ...props}: TodolistsListPropsType) {
    const toDoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn){
            return
        }
        dispatch(getTodolistsTC())
    }, [])

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px', margin: '10px'}}>
            <AddItemForm addItem={addToDoList}/>
        </Grid>
        <Grid container spacing={10}>
            {toDoLists.map(tl => <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                    <TodoList
                        todolist={tl}
                        demo={demo}
                        key={tl.id}
                    /></Paper>
            </Grid>)}
        </Grid>
    </>
}