import express from 'express'
import cors from 'cors'
import { connectDB } from './config/dbConfig.js';
import routerGame from './routes/api.game.js';
import routerUser from './routes/api.user.js';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/game', routerGame)
app.use('/api/users', routerUser)

app.listen(PORT, () => {
    console.log('Server online');
})