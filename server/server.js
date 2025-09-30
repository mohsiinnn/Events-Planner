import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import cors from 'cors'
import eventRouter from './routes/eventRoutes.js';

const app = express();
const port = 3000;
connectDB()

const allowedOrigins = ['http://localhost:5173']

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get('/', (req, res) => {
    res.send('Welcome to Event Planer');
});

app.use('/api/event', eventRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});