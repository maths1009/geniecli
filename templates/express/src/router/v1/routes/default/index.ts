import { Router } from 'express'

import convertRoute from './routes/default'

const router = Router()

router.use(convertRoute)

export default router
