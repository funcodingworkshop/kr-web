export type TUserSession = {
    databaseId: string;
    role: string;
    expires: string;
    someInfo: string;
    user: {
        email: string;
        image: string;
        name: string;
    };
};
