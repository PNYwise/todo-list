import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import { globalAgent } from "http";
import dotenv from 'dotenv';
import { router } from "./routes/Api";
import Activity from "./app/models/Activity";
import Todo from "./app/models/Todo";
dotenv.config()

globalAgent.maxSockets = Infinity

const app: Application = express()
const port = process.env.APP_PORT || 3030

// dependencies
app.use(express.json())
app.use(helmet())
app.use(compression())
Activity.sync().then(() => {
     console.log('activities table created')
     Todo.sync().then(() => {
          console.log('todos table created')
          app.listen(port, () => {
               console.log(`${process.env.APP_NAME || 'express-app'} is running on port ${port}`)
          })
     })
})
app.get("/", (req: Request, res: Response): Response => {
     return res.status(200).send('hallo world')
})
app.use(router)

