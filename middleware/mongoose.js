
import mongoose from "mongoose";
export const connectionStr = "mongodb+srv://ibrahimbajwa1065:ABib381381@cluster0.bathrnt.mongodb.net/dbProduct?retryWrites=true&w=majority";

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






