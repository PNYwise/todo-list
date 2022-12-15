import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config()

const app: Express = express()
const port = process.env.APP_PORT || 3030

app.get("/", (req: Request, res: Response): Response => {
     return res.status(200).send('hallo world')
})

app.listen(port, () => {
     console.log(`${process.env.APP_NAME || 'node-app'} running on port ${port}`)
})