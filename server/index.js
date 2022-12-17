import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import notesRoutes from './routes/notes.js'
import localRoutes from './routes/auth/local.js'

const app = express();

app.use(cors({
    credentials: true,
    origin: '*',
}));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/notes', notesRoutes);
app.use('/auth', localRoutes);

dotenv.config();

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