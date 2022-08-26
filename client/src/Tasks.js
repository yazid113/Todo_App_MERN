import React, { useEffect, useState } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = [""];

  useEffect(() => {
    try {
      const { data } = getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTask(currentTask);
      setTasks((prevState) => [...prevState, data]);
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
    } catch (error) {
      console.log(error);
      setTasks([...tasks]);
    }
  };

  const handleDelete = async (currentTask) => {
    try {
      setTasks(tasks.filter((task) => task._id !== currentTask));
      await deleteTask(currentTask);
    } catch (error) {
      console.log(error);
      setTasks([...tasks]);
    }
  };
};

export default Tasks;
