import mongoose from 'mongoose';

console.log('MONGO_URI!!!!', process.env.MONGODB_URI);

export const connectDB = async () => {
    if (!mongoose.connections[0]?.readyState) {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
        });
    }
};
