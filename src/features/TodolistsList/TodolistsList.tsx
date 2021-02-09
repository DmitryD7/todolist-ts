import React, {useCallback, useEffect} from "react";
import {TodolistDomainType} from "./todolistReducer/todolists-reducer";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {AddItemForm, AddItemFormSubmitHelpersType} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {todolistsActions} from "./index";
import {useActions, useAppDispatch} from "../../utils/reduxUtils";
import {AppRootStateType} from "../../utils/types";

type TodolistsListPropsType = {
    demo?: boolean
}

export function TodolistsList({demo = false, ...props}: TodolistsListPropsType) {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {getTodolists} = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    const onAddItemHandler = useCallback(async (title: string, helper: AddItemFormSubmitHelpersType) => {
        const resultAction = await dispatch(todolistsActions.addTodolist(title))
        if (todolistsActions.addTodolist.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [])


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
            <AddItemForm addItem={onAddItemHandler}/>
        </Grid>
        <Grid container spacing={7}>
            {todolists.map(tl => <Grid item key={tl.id}>
                <div >
                    <TodoList
                        todolist={tl}
                        demo={demo}
                        key={tl.id}
                    /></div>
            </Grid>)}
        </Grid>
    </>
}