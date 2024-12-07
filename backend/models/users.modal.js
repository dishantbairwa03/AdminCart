import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps:true});

export const Users = mongoose.model("User", userSchema);