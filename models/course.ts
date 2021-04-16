import mongoose, { Date, Document } from 'mongoose';
const Schema = mongoose.Schema;

interface ICourse extends Document {
    student: any;
    status: string;
    comment: string;
    dateStart: Date;
    dateEnd: Date;
}

const course = new Schema<ICourse>({
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    status: String,
    comment: String,
    dateStart: Date,
    dateEnd: Date,
});

// to avoid overwrite errror???
// @ts-ignore
mongoose.models = {};

const Course = mongoose.model('Course', course);

export default Course;
