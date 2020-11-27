import React, {useEffect} from "react";
import {TodolistDomainType} from "./todolistReducer/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useActions} from "../../app/store";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {todolistsActions} from "./index";

type TodolistsListPropsType = {
    demo?: boolean
}

export function TodolistsList({demo = false, ...props}: TodolistsListPropsType) {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {addTodolist, getTodolists} = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        getTodolists()
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px', margin: '10px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={10}>
            {todolists.map(tl => <Grid item key={tl.id}>
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