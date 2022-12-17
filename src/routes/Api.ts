import express from "express";

import { getActivities, createActivity, updateActivity, destroyActivity, getActivity } from "../app/controllers/ActivityController";
import { getTodos, createTodo, updateTodo, destroyTodo, getTodo } from "../app/controllers/TodoController";

export const router = express.Router()

//activity - groups
router.get('/activity-groups', getActivities)
router.get('/activity-groups/:id', getActivity)
router.post('/activity-groups', createActivity)
router.patch('/activity-groups/:id', updateActivity)
router.delete('/activity-groups/:id', destroyActivity)

//todo-items
router.get('/todo-items', getTodos)
router.get('/todo-items/:id', getTodo)
router.post('/todo-items', createTodo)
router.patch('/todo-items/:id', updateTodo)
router.delete('/todo-items/:id', destroyTodo)