export interface IState {
  lastUpdate: number;
  light: boolean;
  count: number;
}

export const initialState: IState = {
  lastUpdate: 0,
  light: false,
  count: 0,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      };
    default:
      return state;
  }
};
