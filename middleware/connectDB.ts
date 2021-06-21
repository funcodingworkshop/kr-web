import mongoose from 'mongoose';

const fs = require('fs');
const path = require('path');

console.log('MONGO_URI!!!!', process.env.MONGODB_URI);
console.log('DB', process.env.DB);

export const connectDB = async () => {
    if (!mongoose.connections[0]?.readyState) {
        if (process.env.DB === 'AWS') {
            mongoose
                .connect(process.env.MONGODB_URI_AWS, {
                    useNewUrlParser: true,
                    ssl: true,
                    sslValidate: true,
                    sslCA: fs.readFileSync(
                        path.join(process.cwd(), 'rds-combined-ca-bundle.pem')
                    ),
                })
                .then(() => console.log('Connection to DB successful'))
                .catch((err) => console.error(err, 'Error'));
        } else {
            await mongoose.connect(process.env.MONGODB_URI, {
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useNewUrlParser: true,
            });
        }
    }
};
