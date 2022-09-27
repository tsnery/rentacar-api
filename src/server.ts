import "reflect-metadata"
import express from 'express'
import swaggerUI from 'swagger-ui-express'
import { router } from './routes'
import { initializeDatabase } from './database'

import './shared/container'

import swaggerSetup from './docs/swagger.json'

initializeDatabase()

const PORT = 3001

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSetup))

app.use(router)

app.listen(PORT, () => console.log(`Runnning on http://localhost:${PORT}`)) 