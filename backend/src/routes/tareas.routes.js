import { Router } from "express";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/", obtenerTareas);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
