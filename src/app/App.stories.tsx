import React from 'react';
import {Meta} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {App} from "./App";

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const AppBasic = () => {
    return <App/>
}
