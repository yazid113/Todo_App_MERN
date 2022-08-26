import { useState, useEffect } from "react";
import "./App.css";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  const allTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTask({ task: currentTask });
      const task =  response.data
      setTasks((prevState) => [ ...prevState, task ]);
      setCurrentTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (currentTask) => {
    try {
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index].completed = !tasks[index].completed;
      await updateTask(currentTask, { completed: tasks[index].completed });
      allTasks();
    } catch (error) {
      console.log(error);
      setTasks([...tasks]);
    }
  };

  const handleDelete = async (currentTask) => {
    try {
      setTasks(tasks?.filter((task) => task._id !== currentTask));
      await deleteTask(currentTask);
    } catch (error) {
      console.log(error);
      setTasks([...tasks]);
    }
  };

  useEffect(() => {
    allTasks();
  }, []);

  return (
    <div className="App flex">
      <Paper elevation={3} className="container">
        <div className="heading">TO-DO</div>
        <form
          onSubmit={handleSubmit}
          className="flex"
          style={{ margin: "15px 0" }}
        >
          <TextField
            id="outlined-basic"
            name="todo"
            variant="outlined"
            size="small"
            style={{ width: "80%" }}
            value={currentTask}
            required={true}
            onChange={handleChange}
            placeholder="Add New TO-DO"
          />
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add New ToDo
          </Button>
        </form>
        <div>
          {tasks?.length > 0 ? (
            tasks?.map((task) => (
              <Paper key={task._id} className="flex task_container">
                <Checkbox
                  checked={task.completed}
                  onClick={() => handleUpdate(task._id)}
                  color="primary"
                />
                <div
                  className={
                    task?.completed ? "task line_through" : "task"
                  }
                >
                  {task.task}
                </div>
                <Button
                  onClick={() => handleDelete(task._id)}
                  color="secondary"
                >
                  Delete
                </Button>
              </Paper>
            ))
          ) : (
            <h1>Add some To Do</h1>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default App;
