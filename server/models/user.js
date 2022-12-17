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

userSchema.methods.toJSON = function() {
    return {
        id: this._id,
        provider: this.provider,
        email: this.email,
        name: this.name,
        notes: this.notes,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

userSchema.methods.generateJWT = function() {
    const token = jwt.sign(
        {
            id: this._id,
            provider: this.provider,
            email: this.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
    )
    return token;
}

const User = mongoose.model('User', userSchema);

export default User;