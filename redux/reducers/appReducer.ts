export interface IAppState {
  loading: boolean;
  currentUser: string;
}

export const initialState: IAppState = {
  loading: false,
  currentUser: "Unknown",
};

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case "UPDATE_LOADER":
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
