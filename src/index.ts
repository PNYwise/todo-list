import express, { Application, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import { globalAgent } from "http";
import dotenv from 'dotenv';
import { router } from "./routes/Api";
import Activity from "./app/models/Activity";
import Todo from "./app/models/Todo";
import cluster from "cluster";
const os = require('os');
dotenv.config()


Activity.sync().then(() => {
     console.log('activities table created')
     Todo.sync().then(() => {
          console.log('todos table created')
          if (cluster.isPrimary) {
               console.log(`Number of CPUs is ${os.cpus.length}`);
               console.log(`Master ${process.pid} is running`);

               // Fork workers.
               for (let i = 0; i < 2; i++) {
                    cluster.fork();
               }

               cluster.on("exit", (worker, code, signal) => {
                    console.log(`worker ${worker.process.pid} died`);
                    console.log("Let's fork another worker!");
                    cluster.fork();
               });
          } else {

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
               app.use(helmet())
               app.use(compression())
               app.use(limiter)
               app.listen(port, () => {
                    console.log(`${process.env.APP_NAME || 'express-app'} is running on port ${port}`)
               })
               app.get("/", (req: Request, res: Response): Response => {
                    return res.status(200).send('hallo world')
               })
               app.use(router)
          }

     })
})