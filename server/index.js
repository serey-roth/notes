import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
import morgan from 'morgan'

import notesRoutes from './routes/notes.js'
import localRoutes from './routes/auth/local.js'
import googleRoutes from './routes/auth/google.js'

import googleLogin from './services/googleStrategy.js'
import { localLogin, localRegister } from './services/localStrategy.js'
import jwtLogin from './services/jwtStrategy.js'

// general setup
dotenv.config();

const app = express();

app.use(morgan('tiny'));

app.use(cors({
    credentials: true,
    origin: '*',
}));

// set up body parser middleware for express to 
// parse both JSON and x-www-form-urlencoded request bodies
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));

passport.use('local-login', localLogin);
passport.use('local-register', localRegister);
passport.use(googleLogin);
passport.use(jwtLogin);

// set up passport for authentication
app.use(passport.initialize());

// set up routes for express 
app.use('/home/notes', notesRoutes);
app.use('/auth', localRoutes);
app.use('/auth', googleRoutes);

// connect to MongoDB server
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
