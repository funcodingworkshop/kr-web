import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

interface IUser extends Document {
    email: string;
    passwordHash: string;
    role: string;
    date: string;
    name: string;
}

const user = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'student',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    name: String,
});

//to avoid overwrite errror???
mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
