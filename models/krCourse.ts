import mongoose, { Date, Document } from 'mongoose';
const Schema = mongoose.Schema;

interface IKrCourse extends Document {
    student: any;
    status: string;
    comment: string;
    dateStart: Date;
    dateEnd: Date;
}

const krCourse = new Schema<IKrCourse>({
    student: { type: Schema.Types.ObjectId, ref: 'KrUser' },
    status: String,
    comment: String,
    dateStart: Date,
    dateEnd: Date,
});

// to avoid overwrite errror???
// @ts-ignore
mongoose.models = {};

const KrCourse = mongoose.model<IKrCourse>('KrCourse', krCourse);

export default KrCourse;
