import mongoose, { Date, Document } from 'mongoose';
const Schema = mongoose.Schema;

interface IKrCoursesSession extends Document {
    course: any;
    date: Date;
    description: string;
    videolink: string;
    feedback: string;
}

const krCoursesSession = new Schema<IKrCoursesSession>({
    course: { type: Schema.Types.ObjectId, ref: 'krCourse' },
    date: Date,
    description: String,
    videolink: String,
    feedback: String,
});

// to avoid overwrite errror???
// @ts-ignore
mongoose.models = {};

const KrCoursesSession = mongoose.model<IKrCoursesSession>(
    'KrCoursesSessions',
    krCoursesSession
);

export default KrCoursesSession;
