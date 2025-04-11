import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "staff", "resident"],
    default: "resident",
  },
});

//

const User = mongoose.model("User", UserSchema);

export default User;
