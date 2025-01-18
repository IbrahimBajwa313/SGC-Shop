import mongoose from "mongoose";

export const connectionStr = "mongodb+srv://ibrahimbajwa1065:ABib381381@cluster0.bathrnt.mongodb.net/dbProduct?retryWrites=true&w=majority";

const connectDB = (handler) => async (req, res) => {
  // Check if already connected
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  // Establish new connection if not connected
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' }  // Ensure correct write concern
  });

  return handler(req, res);
};

export default connectDB;
