import { Request, Response } from "express";
import { get, getById, create, update, destroy } from "../services/TodoService";
import { responseBuilder } from "../actions/ResponseBuilder";

export const getTodos = async (req: Request, res: Response): Promise<Response> => {
     const { activity_group_id } = req.query
     const data = await get(+activity_group_id!);
     if (data) {
          return responseBuilder(res, 200, "Success", "Success", data as [])
     }
     return responseBuilder(res, 200, "Success", "Success")
}

export const getTodo = async (req: Request, res: Response): Promise<Response> => {
     const { id } = req.params
     const data = await getById(+id);
     if (data == null) {
          return responseBuilder(res, 404, "Not Found", `Todo with ID ${id} Not Found`)
     }
     return responseBuilder(res, 200, "Success", "Success", data as object)
}
export const createTodo = async (req: Request, res: Response): Promise<Response> => {
     const { activity_group_id, title } = req.body
     if (activity_group_id == null || !Boolean(activity_group_id) || activity_group_id == undefined) {
          return responseBuilder(res, 400, "Bad Request", "activity_group_id cannot be null")
     }

     if (String(title).trim().length == 0 || Number(title).valueOf() || title == 0 || title == null) {
          return responseBuilder(res, 400, "Bad Request", "title cannot be null")
     }
     const data = await create(req.body);
     return responseBuilder(res, 201, "Success", "Success", data as object)
}

export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
     const { id } = req.params
     const data = await update(+id, req.body);
     if (data == null) {
          return responseBuilder(res, 404, "Not Found", `Todo with ID ${id} Not Found`)
     }
     return responseBuilder(res, 200, "Success", "Success", data as object)
}

export const destroyTodo = async (req: Request, res: Response): Promise<Response> => {
     const { id } = req.params
     const data = await destroy(+id);
     if (data == null) {
          return responseBuilder(res, 404, "Not Found", `Todo with ID ${id} Not Found`)
     }
     return responseBuilder(res, 200, "Success", "Success")
}