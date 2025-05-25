import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
