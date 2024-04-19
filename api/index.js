import express from "express";
import { createTask, deleteTasks, fetchTasks, updateTask } from "./task.js";
import serverless from "serverless-http";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json);
if (process.env.DEVELOPMENT) {
  app.use(cors);
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks:${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const tasks = req.body;
    const response = await createTask(tasks);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error adding tasks:${err}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const tasks = req.body;
    const response = await updateTask(tasks);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks:${err}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks:${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
