import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const serviceSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String},
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true }
})

serviceSchema.plugin(mongoosePaginate);
export default mongoose.model("Service", serviceSchema)