import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: false },
  role: { type: String, required: true, default: "user" },
  savedPlaces: [{ type: String, required: false, default: "" }],
  beenTo: [{ type: String, required: false, default: "" }],
  emailVerified: { type: Boolean, required: false, default: null },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
