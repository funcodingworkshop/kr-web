import mongoose from 'mongoose';
const fs = require('fs');

console.log('MONGO_URI!!!!', process.env.MONGODB_URI);

export const connectDB = async () => {
    if (!mongoose.connections[0]?.readyState) {
        mongoose
            .connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                ssl: true,
                sslValidate: true,
                sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem'),
            })
            .then(() => console.log('Connection to DB successful'))
            .catch((err) => console.error(err, 'Error'));
    }
};
