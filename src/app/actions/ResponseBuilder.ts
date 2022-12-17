import { Response } from "express";

export const responseBuilder = (res: Response, code: number, status: string, message: string, data: object | [] = {}): Response => {
     return res.status(code).send({
          status: status,
          message: message,
          data: data
     })
}