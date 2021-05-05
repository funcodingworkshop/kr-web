import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

interface IKrUser extends Document {
    email: string;
    role: string;
    name: string;
    image: string;
    date: Date;
    courses: string[];
}

const krUser = new Schema<IKrUser>({
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        default: 'student',
    },
    name: String,
    image: String,
    date: Date,
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'KrCourse',
        },
    ],
});

// to avoid overwrite errror???
// @ts-ignore
mongoose.models = {};

const KrUser = mongoose.model<IKrUser>('KrUser', krUser);

export default KrUser;
