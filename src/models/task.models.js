import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
mongoose.plugin(mongoosePaginate);
const Task = mongoose.model("tasks", new mongoose.Schema({
  name: String,
}));

export default Task;
