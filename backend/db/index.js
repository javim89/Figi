import pkg from 'mongoose';

const { connect } = pkg;

const connectDB = async () => {
  try {
    await connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log("Mongo db connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
