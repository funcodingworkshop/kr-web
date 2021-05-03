import { combineReducers } from 'redux';
import { appReducer, IAppState } from './appReducer';
import { testReducer, ITestState } from './testReducer';
import { addSessionReducer, IAddSessionState } from './addSessionReducer';
import { INotificationState, createNewMsgReducer } from './notificationReducer';

export interface IRootState {
    app: IAppState;
    test: ITestState;
    addSession: IAddSessionState;
    newMsg: INotificationState;
}

export const rootReducer = combineReducers({
    app: appReducer,
    test: testReducer,
    addSession: addSessionReducer,
    newMsg: createNewMsgReducer,
});
