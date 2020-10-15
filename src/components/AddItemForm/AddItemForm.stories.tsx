import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {Meta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
} as Meta;

export const AddItemFormBasic = () => {
    return <AddItemForm addItem={action('Button clicked')}/>
}

export const AddItemFormDisabledExample = () => {
    return <AddItemForm addItem={action('Button clicked')} disabled={true}/>
}