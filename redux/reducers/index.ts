import { combineReducers } from 'redux';
import { appReducer, IAppState } from './appReducer';
import { testReducer, ITestState } from './testReducer';

export interface IRootState {
    app: IAppState;
    test: ITestState;
}

export const rootReducer = combineReducers({
    app: appReducer,
    test: testReducer,
});
