import mongoose from "mongoose";

const PlantsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },

    swapped: { type: Boolean, default: false },
    lightNeeds: {
      type: String,
      required: true,
      enum: ["low", "medium", "bright"],
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

const Plants = mongoose.model("Plants", PlantsSchema);

export default Plants;
