import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {Meta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
} as Meta;

const asyncCallback = async (...params: any[]) => {
    action('Button clicked')(...params)
}

export const AddItemFormBasic = () => {
    return <AddItemForm addItem={asyncCallback}/>
}

export const AddItemFormDisabledExample = () => {
    return <AddItemForm addItem={asyncCallback} disabled={true}/>
}