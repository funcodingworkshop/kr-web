export enum AddSessionActionTypes {
    ADD_SESSION = 'ADD_SESSION',
}

export const add_session = (id: string, name: string) => ({
    type: AddSessionActionTypes.ADD_SESSION,
    id,
    name,
});
