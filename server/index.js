import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import notesRoutes from './routes/notes.js'
import emailRoutes from './routes/auth/email.js'
import googleRoutes from './routes/auth/google.js'

import googleLogin from './services/googleStrategy.js'
import emailLogin from './services/emailStrategy.js'
import jwtLogin from './services/jwtStrategy.js'

import User from './models/user.js'

// general setup
dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    origin: '*',
}));

// set up body parser middleware for express to 
// parse both JSON and x-www-form-urlencoded request bodies
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

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

// set up sessions
app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.CONNECTION_URL,
        collection: "sessions",
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

// set up passport for authentication
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
});

passport.use(googleLogin);
passport.use(emailLogin);
passport.use(jwtLogin);

app.use(passport.initialize());
app.use(passport.session());

// set up routes for express 
app.use('/notes', notesRoutes);
app.use('/auth', emailRoutes);
app.use('/auth', googleRoutes);

