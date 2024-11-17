import mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DATABASE = process.env.DATABASE;

const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DATABASE}?authSource=${DATABASE}&replicaSet=db-mongodb-fra1-19919&tls=true`;

export const connectDB = async () => {

  return mongoose.connect(mongoUri);

};