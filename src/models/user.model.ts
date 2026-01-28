import mongoose from "mongoose";

import { UserInterface } from "../types/user.type";

const UserSchema = new mongoose.Schema<UserInterface>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: function (this: any): boolean { return this.authProvider !== 'google' } },
    phoneNumber: { type: String },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
    googleId: { type: String, sparse: true, unique: true },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' }
})

const User = mongoose.model("User", UserSchema);
export default User;