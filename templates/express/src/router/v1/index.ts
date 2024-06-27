import { Router } from 'express'
import convertRouter from './routes/default'

const router = Router()

router.use('/default', convertRouter)

export default router
