import { Router } from 'express'
import userModel from '../models/user.model.js'
import leaderModel from '../models/leader.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const response = await userModel.find()
    res.json(response)
})

// Backend (Node.js, Express, Mongoose - ejemplo generalizado)
router.post('/', async (req, res) => {
    try {
      const { name, email, leaderId } = req.body;
  
      // Asegúrate de que el líder existe
      const selectedLeader = await leaderModel.findById(leaderId);
      if (!selectedLeader) {
        return res.status(400).json({ error: 'Líder inválido' }); 
      }
  
      const newUser = new userModel({ name, email, leaderId });
      await newUser.save();
  
      res.status(201).json(newUser); 
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ error: 'Error al crear el usuario' });    
    }
  });
  

export default router