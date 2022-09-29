import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import { router } from './routes'
import { initializeDatabase } from './database'

import './shared/container'

import swaggerSetup from './docs/swagger.json'
import { AppError } from "./errors/AppError"

initializeDatabase()

const PORT = 3001

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSetup))

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({ status: 'Error', message: `Internal server error - ${error.message}` })
})

app.listen(PORT, () => console.log(`Runnning on http://localhost:${PORT}`)) 