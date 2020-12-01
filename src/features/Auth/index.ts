import {authAsyncActions, slice} from "./auth-reducer";
import {Login} from "./Login";
import * as authSelectors from './selectors'


const authActions = {
    ...authAsyncActions,
    ...slice.actions
}

const authReducer = slice.reducer

export {
    authActions,
    Login,
    authSelectors,
    authReducer
}