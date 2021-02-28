export enum TestActionTypes {
    TICK = 'TICK',
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    RESET = 'RESET',
}

export const tickAC = (light: boolean = true) => ({
    type: TestActionTypes.TICK,
    light,
    lastUpdate: Date.now(),
});

export const incrementAC = () => ({ type: TestActionTypes.INCREMENT });

export const decrementAC = () => ({ type: TestActionTypes.DECREMENT });

export const resetAC = () => ({ type: TestActionTypes.RESET });
