import express from "express";
import cors from "cors";
import tareasRoutes from "./routes/tareas.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando correctamente.");
});

app.use("/api/tareas", tareasRoutes);

export default app;
