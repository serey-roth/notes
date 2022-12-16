import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/user";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: "No user with this email!"});
        }

        const isCorrectPassword = bcrypt.compare(
            password, existingUser.password);

        if (!isCorrectPassword) {
            return res.status(401).json({ message: 'Incorrect password!'});
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Sign In was unsuccessful. Please try again!'});
    }
}

export const signUp = async (req, res) => {
    const { email, password, ...rest } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: 'This email has been taken!'})
        }

        const hashedPassword = bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            ...rest
        });

        const token = jwt.sign({
            email: result.email,
            id: result._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h'})

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Sign Up was unsuccessful. Please try again!'})
    }
}