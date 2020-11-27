import {authAsyncActions, slice} from "./auth-reducer";
import { Login } from "./Login";
import * as authSelectors from './selectors'


const authActions = {
    ...authAsyncActions,
    ...slice.actions
}

export {
    authActions,
    Login,
    authSelectors,
}