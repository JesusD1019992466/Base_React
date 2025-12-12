import express from 'express';
import { TaskController } from '../controllers/taskController.js';

const router = express.Router();

// Rutas CRUD
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;