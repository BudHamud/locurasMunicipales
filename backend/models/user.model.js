import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "Leader" },
  decisions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Decision" }],
  stats: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
