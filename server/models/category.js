import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const categorySchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

export default mongoose.model("Category", categorySchema);
