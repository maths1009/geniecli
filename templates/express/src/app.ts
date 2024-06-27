import { PrismaClient } from '@prisma/client'

import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Express, Response } from 'express'

import Router from './router'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT

// ORM - PRISMA
export const prisma = new PrismaClient()

// PARSER
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CORS
app.use(cors())

// ROUTES
app.use(Router)

// 404
app.use((_, res: Response, __) => {
  res.status(404).json({ message: 'Route not Found' })
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
