import pkg from 'mongoose';

const { connect } = pkg;

const connectDB = async () => {
  try {
    await connect("mongodb://localhost/figi");
    console.log("Mongo db connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
