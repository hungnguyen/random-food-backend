import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const foodSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  image: {
    type: String,
  },
  userId: mongoose.Types.ObjectId,
});

export default mongoose.model("Food", foodSchema);
