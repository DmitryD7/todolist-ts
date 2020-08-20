import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {Button, ButtonProps} from './Button';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

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
            task={{id: '1', isDone: false, title: 'JS'}}
        />
        <Task
            changeTaskStatus={action('Task status was changed')}
            changeTaskTitle={action('Task title was changed')}
            removeTask={action('Task was removed')}
            todoListId={'todolistId1'}
            task={{id: '2', isDone: true, title: 'CSS'}}
        />

    </>
}
