
import mongoose from "mongoose";
 export const connectionStr = process.env.MONGODB_CONNECTION_STRINGS;

const connectDB = handler => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState) {
      return await handler(req, res);
    }

    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return await handler(req, res);
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default connectDB;






