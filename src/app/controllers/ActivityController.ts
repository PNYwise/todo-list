import { Request, Response } from "express";
import { get, getById, create, update, destroy } from "../services/ActivityService";
import { responseBuilder } from "../actions/ResponseBuilder";

export const getAll = async (req: Request, res: Response): Promise<Response> => {
     const data = await get();
     if (data) {
          return responseBuilder(res, 200, "Success", "Success", data as [])
     }
     return responseBuilder(res, 400, "Not Found", "Data Not Found")
}

export const getActivity = async (req: Request, res: Response): Promise<Response> => {
     const { id } = req.params
     const data = await getById(+id);
     if (data == null) {
          return responseBuilder(res, 404, "Not Found", `Activity with ID ${id} Not Found`)
     }
     return responseBuilder(res, 200, "Success", "Success", data as object)
}
export const createActivity = async (req: Request, res: Response): Promise<Response> => {
     const { email, title } = req.body
     if (email == null || email == "" || email == undefined) {
          return responseBuilder(res, 400, "Bad Request", "email cannot be null")
     }
     if (title == null || title == "" || title == undefined) {
          return responseBuilder(res, 400, "Bad Request", "title cannot be null")
     }
     const data = await create(req.body);
     return responseBuilder(res, 201, "Success", "Success", data as object)
}

export const updateActivity = async (req: Request, res: Response): Promise<Response> => {
     const { title } = req.body
     const { id } = req.params
     if (title == null || title == "" || title == undefined) {
          return responseBuilder(res, 400, "Bad Request", "title cannot be null")
     }
     const data = await update(+id, req.body);
     if (data == null) {
          return responseBuilder(res, 404, "Not Found", `Activity with ID ${id} Not Found`)
     }
     return responseBuilder(res, 200, "Success", "Success", data as object)
}

export const destroyActivity = async (req: Request, res: Response): Promise<Response> => {
     const { id } = req.params
     const data = await destroy(+id);
     if (data == null) {
          return responseBuilder(res, 404, "Not Found", `Activity with ID ${id} Not Found`)
     }
     return responseBuilder(res, 200, "Success", "Success")
}