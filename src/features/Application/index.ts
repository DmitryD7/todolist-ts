import * as appSelectors from './selectors'
import {asyncAppActions, slice, RequestStatusType as T1} from "./appReducer/app-reducer"


const appReducer = slice.reducer
const appActions = {
    ...asyncAppActions,
    ...slice.actions
}

export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions,
}