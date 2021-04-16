import { AddSessionActionTypes } from '../actions/addSessionActions';

export interface IAddSessionState {
    id: string;
    name: string;
}

export const initialState: IAddSessionState = {
    id: null,
    name: null,
};

export const addSessionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case AddSessionActionTypes.ADD_SESSION:
            return {
                ...state,
                id: action.id,
                name: action.name,
            };
        default:
            return state;
    }
};
