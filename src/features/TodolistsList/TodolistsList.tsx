import React, {useCallback, useEffect} from "react";
import {addTodolistTC, setTodolistsTC, TodolistDomainType} from "./todolistReducer/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/Todolist";

type TodolistsListPropsType = {}

export function TodolistsList(props: TodolistsListPropsType) {
    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const toDoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return <>
        <Grid container style={{padding: '20px', margin: '10px'}}>
            <AddItemForm addItem={addToDoList}/>
        </Grid>
        <Grid container spacing={10}>
            {toDoLists.map(tl => <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                    /></Paper>
            </Grid>)}
        </Grid>
    </>
}