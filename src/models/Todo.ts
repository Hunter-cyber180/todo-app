import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["CHECKED", "NOT_CHECKED"],
      default: "NOT_CHECKED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
