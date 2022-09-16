import express from 'express'
import { categoriesRoutes } from './routes/categories.routes'

const PORT = 3001

const app = express()

app.use(express.json())

app.use('/categories', categoriesRoutes)

app.listen(PORT, () => console.log(`Runnning on http://localhost:${PORT}`)) 