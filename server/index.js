import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'

import notesRoutes from './routes/notes.js'
import emailRoutes from './routes/auth/email.js'
import googleRoutes from './routes/auth/google.js'

import googleLogin from './services/googleStrategy.js'
import emailLogin from './services/emailStrategy.js'
import jwtLogin from './services/jwtStrategy.js'

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: '*',
}));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(passport.initialize());

app.use('/notes', notesRoutes);
app.use('/auth', emailRoutes);
app.use('/auth', googleRoutes);

passport.use(googleLogin);
passport.use(emailLogin);
passport.use(jwtLogin);

const PORT = process.env.PORT || 5050;

mongoose.set('strictQuery', false);
mongoose.connect(
    encodeURI(process.env.CONNECTION_URL), 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))