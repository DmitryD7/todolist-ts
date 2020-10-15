import React from 'react';
import {Meta} from "@storybook/react";
import {HashRouterDecorator, ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {App} from "./App";

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
} as Meta;

export const AppBaseExample = () => {
    return <App demo={true}/>
}
