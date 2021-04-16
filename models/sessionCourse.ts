import mongoose, { Date, Document } from 'mongoose';
const Schema = mongoose.Schema;

interface ISessionCourse extends Document {
    course: any;
    date: Date;
    description: string;
    videolink: string;
    feedback: string;
}

const sessionCourse = new Schema<ISessionCourse>({
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    date: Date,
    description: String,
    videolink: String,
    feedback: String,
});

// to avoid overwrite errror???
// @ts-ignore
mongoose.models = {};

const SessionCourse = mongoose.model('SessionCourse', sessionCourse);

export default SessionCourse;
