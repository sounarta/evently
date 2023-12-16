import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  joinedAt: Date;
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String},
    password: { type: String },
    picture: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now},
});

const User = models.User || model("User", UserSchema);

export default User;
