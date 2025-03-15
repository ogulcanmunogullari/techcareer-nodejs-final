const express = require("express");
const fs = require("fs");
const router = express.Router();
const dbFile = "db.json";

const readDB = () => {
  try {
    const data = fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { todos: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Veri yazma hatası:", error);
  }
};

router.get("/", (req, res) => {
  const datas = readDB();

  datas.todos.sort((a, b) => new Date(a.created) - new Date(b.created));

  res.render("index", { todos: datas.todos });
});

router.post("/todos", (req, res) => {

  const datas = readDB();

  const newTodo = {
    id: new Date().getTime() * Math.random() * 10,
    todo: req.body.text,
    isCompleted: false,
    isEditMode: false,
    created: new Date(),
  };

  datas.todos.push(newTodo);

  writeDB(datas);

  res.status(200).json(newTodo);
});

router.put("/todos/:id", (req, res) => {
  const datas = readDB();

  const todo = datas.todos.find((todo) => todo.id == req.params.id);

  let completed;

  if (req.body.isCompleted == false) {
    completed = false;
  } else if (req.body.isCompleted == "x") {
    completed = !todo.isCompleted;
  } else {
    completed = todo.isCompleted;
  }

  const newTodo = {
    id: todo.id,
    todo: req.body.todo ?? todo.todo,
    isCompleted: completed,
    isEditMode: req.body.isEditMode ?? todo.isEditMode,
    created: todo.created,
  };

  Object.assign(todo, newTodo);

  writeDB(datas);
  res.json(todo);
});

router.delete("/todos/:id", (req, res) => {
  let datas = readDB();

  datas.todos = datas.todos.filter((todo) => todo.id != req.params.id);

  writeDB(datas);

  res.send("Todo silindi.");
});

router.delete("/todos", (req, res) => {
  let datas = readDB();

  datas.todos = datas.todos.filter((todo) => todo.isCompleted == false);

  writeDB(datas);

  res.send("Biten Todolar silindi.");
});

module.exports = router;
