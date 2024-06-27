import { Router } from 'express'
import { defaultController } from '../controller'

const router = Router()

router.post('/', defaultController.default)

export default router
