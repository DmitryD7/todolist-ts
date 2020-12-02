import {asyncAppActions, slice, RequestStatusType as T1} from "./appReducer/app-reducer"
import * as appSelectors from './selectors'



const appActions = {
    ...asyncAppActions,
    ...slice.actions
}
const appReducer = slice.reducer

export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions,
}