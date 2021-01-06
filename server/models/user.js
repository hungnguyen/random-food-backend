import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
