import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {useActions} from "../../../../app/store";
import {tasksActions} from "../../index";

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const {removeTask, updateTask} = useActions(tasksActions)

    const onStatusChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask(
            {taskId: props.task.id,
                todolistId: props.todoListId,
                domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}})
    },[props.task.id, props.todoListId])

    const onTitleChangeCallback = useCallback((newTitle: string) => {
            updateTask({taskId: props.task.id,
                    todolistId: props.todoListId,
                    domainModel: {title: newTitle}})
        },[props.task.id, props.todoListId])

    const removeTaskHandler = useCallback(() => removeTask({taskId: props.task.id, todolistId: props.todoListId}),
        [props.task.id, props.todoListId])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
             style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
            <Checkbox
                color={"secondary"}
                checked={props.task.status === TaskStatuses.Completed}
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