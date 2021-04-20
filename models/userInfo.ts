import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

interface IUserInfo extends Document {
    email: string;
    role: string;
    name: string;
    image: string;
    date: Date;
}

const userInfo = new Schema<IUserInfo>({
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        default: 'student',
    },
    name: String,
    image: String,
    date: Date,
});

// to avoid overwrite errror???
// @ts-ignore
mongoose.models = {};

const UserInfo = mongoose.model('UserInfo', userInfo);

export default UserInfo;
