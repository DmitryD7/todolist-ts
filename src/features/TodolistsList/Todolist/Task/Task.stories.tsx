import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";
import {ReduxStoreProviderDecorator} from "../../../../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Example/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const TaskExample = () => {
    return <>
        <Task
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