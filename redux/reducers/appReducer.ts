import { ELoggedIn } from '../../types/ELoggedIn';
import { AppActionTypes } from '../actions/appActions';

export interface IAppState {
    loading: boolean;
    currentUser: string;
    currentEmail: string;
    isLoggedIn: ELoggedIn;
}

export const initialState: IAppState = {
    loading: false,
    currentUser: undefined,
    currentEmail: undefined,
    isLoggedIn: ELoggedIn.Unknown,
};

export const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case AppActionTypes.UPDATE_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                currentEmail: action.currentEmail,
            };
        case AppActionTypes.UPDATE_LOADER:
            return {
                ...state,
                loading: action.loading,
            };
        case AppActionTypes.UPDATE_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        default:
            return state;
    }
};
