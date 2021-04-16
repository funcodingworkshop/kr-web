import { ERole } from './ERole';

export type TUserSession = {
    databaseId: string;
    role: ERole | string;
    expires: string;
    someInfo: string;
    user: {
        email: string;
        image: string;
        name: string;
    };
};
