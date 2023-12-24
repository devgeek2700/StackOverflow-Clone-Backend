import dotenv from 'dotenv'
import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import usersRoutes from './routes/users.js'
import questionroutes from './routes/Questions.js'
import answerRoutes from './routes/Answer.js'
const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get("/", (req, res) => {
    res.send("stackoverflow clone!");
});

app.use('/user', usersRoutes)
app.use('/question', questionroutes)
app.use('/answer', answerRoutes)

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) }))
    .catch((error) => { console.log(error) })