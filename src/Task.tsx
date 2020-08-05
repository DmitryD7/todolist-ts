import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    todoListId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId);
    }
    const onTitleChangeCallback = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId);
    }
    const removeTaskHandler = () => {
        props.removeTask(props.task.id, props.todoListId);
    }

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}
             style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>

            <Checkbox
                color={"secondary"}
                checked={props.task.isDone}
                onChange={onStatusChangeHandler}
            />

            <EditableSpan title={props.task.title} setNewTitle={onTitleChangeCallback}/>
            <IconButton
                onClick={removeTaskHandler}
                style={{marginLeft: 'auto'}}>
                <DeleteOutline/>
            </IconButton>
        </div>
    )
})