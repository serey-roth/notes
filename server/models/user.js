import mongoose from "mongoose";
import { noteSchema } from "./note.js";

export const userSchema = mongoose.Schema({
    provider: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 60,
    },
    googleId: {
        type: String,
        unique: true,
    },
    notes: {
        type: [ noteSchema ],
        default: [],
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;