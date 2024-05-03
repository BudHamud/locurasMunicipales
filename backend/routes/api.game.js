import { Router } from 'express'
import leaderModel from '../models/leader.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const response = await leaderModel.find()
    res.json(response)
})

export default router