// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  telephones: [
    {
      number: Number,
      area_code: Number,
    },
  ],
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
