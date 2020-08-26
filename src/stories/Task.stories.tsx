import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Example/Task',
    component: Task,
} as Meta;

export const TaskExample = () => {
    return <>
        <Task
            changeTaskStatus={action('Task status was changed')}
            changeTaskTitle={action('Task title was changed')}
            removeTask={action('Task was removed')}
            todoListId={'todolistId1'}
            task={{
                id: '1',
                status: TaskStatuses.New,
                title: 'JS',
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            }}
        />
        <Task
            changeTaskStatus={action('Task status was changed')}
            changeTaskTitle={action('Task title was changed')}
            removeTask={action('Task was removed')}
            todoListId={'todolistId1'}
            task={{
                id: '2',
                status: TaskStatuses.Completed,
                title: 'CSS',
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: ''
            }}
        />

    </>
}