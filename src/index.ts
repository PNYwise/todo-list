import express, { Application, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { globalAgent } from "http";
import dotenv from 'dotenv';
import { router } from "./routes/Api";
import Activity from "./app/models/Activity";
import Todo from "./app/models/Todo";
import cors from "cors";
const cache = require('./app/middlewares/cache')

dotenv.config()

Activity.sync().then(() => {
     console.log('activities table created')
     Todo.sync().then(() => {
          console.log('todos table created')

          globalAgent.maxSockets = Infinity

          const limiter = rateLimit({
               windowMs: 60 * 1000,
               max: 12000,
               standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
               legacyHeaders: false,
          })

          const app: Application = express()
          const port = process.env.APP_PORT || 3030

          // dependencies
          app.use(express.json())
          // app.use(helmet())
          app.use(compression())
          app.use(cors())
          app.use(limiter)
          app.use(cache(300))
          app.get("/", (req: Request, res: Response): Response => {
               return res.status(200).send('hallo world')
          })
          app.use(router)
          app.listen(port, () => {
               console.log(`${process.env.APP_NAME || 'express-app'} is running on port ${port}`)
          })

     })
})