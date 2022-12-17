import express from "express";

import { getAll, createActivity, updateActivity, destroyActivity, getActivity } from "../app/controllers/ActivityController";

export const router = express.Router()

router.get('/activity-groups', getAll)
router.get('/activity-groups/:id', getActivity)
router.post('/activity-groups', createActivity)
router.patch('/activity-groups/:id', updateActivity)
router.delete('/activity-groups/:id', destroyActivity)