import mongoose from "mongoose";
const { Schema } = mongoose;

const EquipmentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

const SportsSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  items: [EquipmentsSchema],
});

export default mongoose.model("Sports", SportsSchema);

export const SportsEquipments = mongoose.model(
  "SportsEquipments",
  EquipmentsSchema
);
