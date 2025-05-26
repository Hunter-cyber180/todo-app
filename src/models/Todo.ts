import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create todo schema
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

// create todo model
export default mongoose.model("Todo", todoSchema);
