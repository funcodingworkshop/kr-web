export enum AppActionTypes {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_LOADER = "UPDATE_LOADER",
}

export const updateUserAC = (currentUser: string) => ({
  type: AppActionTypes.UPDATE_USER,
  currentUser,
});

export const updateLoaderAC = (loading: boolean) => ({
  type: AppActionTypes.UPDATE_LOADER,
  loading,
});
