import React from 'react';
import {Meta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
} as Meta;

export const EditableSpanBasic = () => {
    return <EditableSpan title={'Hello'} setNewTitle={action('Title was changed')}/>
}

export const EditableSpanDisabledExample = () => {
    return <EditableSpan title={'Hello'} setNewTitle={action('Title was changed')} disabled={true}/>
}