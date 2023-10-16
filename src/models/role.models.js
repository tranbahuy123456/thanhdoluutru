import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const roleSchema = new mongoose.Schema({
  name:String,
  task: [],
});
mongoose.plugin(mongoosePaginate);
const Role = mongoose.model('role', roleSchema);
export default Role;
