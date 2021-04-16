import { combineReducers } from 'redux';
import { appReducer, IAppState } from './appReducer';
import { testReducer, ITestState } from './testReducer';
import { addSessionReducer, IAddSessionState } from './addSessionReducer';

export interface IRootState {
    app: IAppState;
    test: ITestState;
    addSession: IAddSessionState;
}

export const rootReducer = combineReducers({
    app: appReducer,
    test: testReducer,
    addSession: addSessionReducer,
});
