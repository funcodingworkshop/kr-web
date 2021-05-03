export enum NotificationActionTypes {
    NEW_MESSAGE = 'NEW_MESSAGE',
}

export const createNewMsg = (msg: any) => ({
    type: NotificationActionTypes.NEW_MESSAGE,
    data: msg,
});
