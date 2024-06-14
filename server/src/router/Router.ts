import express from "express";
import * as Controller from '../controller/Controller';

const router = express.Router();

router.get('/api/v1/tasks', Controller.findAll);
router.get('/api/v1/tasks/:id', Controller.findOne);
router.post('/api/v1/tasks', Controller.createTask);
router.put('/api/v1/tasks/:id', Controller.updateTask);
router.delete('/api/v1/tasks/:id', Controller.deleteTask);

export default router;
