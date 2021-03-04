import { ELoggedIn } from '../../types/ELoggedIn';

export enum AppActionTypes {
    UPDATE_USER = 'UPDATE_USER',
    UPDATE_LOADER = 'UPDATE_LOADER',
    UPDATE_IS_LOGGED_IN = 'UPDATE_IS_LOGGED_IN',
}

export const updateUserAC = (
    currentUser: string,
    currentEmail: string,
    currentId: string
) => ({
    type: AppActionTypes.UPDATE_USER,
    currentUser,
    currentEmail,
    currentId,
});

export const updateLoaderAC = (loading: boolean) => ({
    type: AppActionTypes.UPDATE_LOADER,
    loading,
});

export const updateIsLoggedInAC = (isLoggedIn: ELoggedIn) => ({
    type: AppActionTypes.UPDATE_IS_LOGGED_IN,
    isLoggedIn,
});
