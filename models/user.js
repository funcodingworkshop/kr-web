import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
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
