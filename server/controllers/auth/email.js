import bcrypt from 'bcryptjs'

import User from "../../models/user.js";

export const signIn = async (req, res) => {
    if (!req.user) {
        return res.status(500).json({ message: 'Sign In was unsuccessful. Please try again!'});
    }

    const token = req.user.generateJWT();
    const user = req.user.toJSON();
    res.json({ token, user });
}

export const signUp = async (req, res) => {
    const { email, password, ...rest } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: 'Email is taken!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            email,
            password: hashedPassword,
            provider: 'email',
            ...rest
        });

        const token = user.generateJWT();
        res.status(200).json({ user: user.toJSON(), token });
    } catch (error) {
        res.status(500).json({ message: 'Sign Up was unsuccessful. Please try again!'})
    }
}

export const logout = async (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL_AUTH);
}