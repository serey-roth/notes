import mongoose from "mongoose";
import { noteSchema } from "./note.js";

export const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
    notes: [ noteSchema ]
});

const User = mongoose.model('User', userSchema);

export default User;