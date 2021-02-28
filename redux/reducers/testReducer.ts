import { TestActionTypes } from '../actions/testActions';

export interface ITestState {
    lastUpdate: number;
    light: boolean;
    count: number;
}

export const initialState: ITestState = {
    lastUpdate: 0,
    light: false,
    count: 0,
};

export const testReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TestActionTypes.TICK:
            return {
                ...state,
                lastUpdate: action.lastUpdate,
                light: !!action.light,
            };
        case TestActionTypes.INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            };
        case TestActionTypes.DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        case TestActionTypes.RESET:
            return {
                ...state,
                count: initialState.count,
            };
        default:
            return state;
    }
};
