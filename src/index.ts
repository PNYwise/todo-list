import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv';
import { router } from "./routes/Api";
dotenv.config()

const app: Application = express()
const port = process.env.APP_PORT || 3030
app.use(express.json())
app.get("/", (req: Request, res: Response): Response => {
     return res.status(200).send('hallo world')
})
app.use(router)
app.listen(port, () => {
     console.log(`${process.env.APP_NAME || 'express-app'} is running on port ${port}`)
})