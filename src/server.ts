import express from 'express'
import swaggerUI from 'swagger-ui-express'
import { router } from './routes'

import swaggerSetup from './docs/swagger.json'

const PORT = 3001

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSetup))

//teste

app.use(router)

app.listen(PORT, () => console.log(`Runnning on http://localhost:${PORT}`)) 