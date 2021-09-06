import React from "react";
import TaskCreateForm from "../components/TaskCreateForm";
import Navbar from "../components/Navbar";

function TaskCreate() {
  return (
    <div>
      <Navbar />
      <TaskCreateForm />
    </div>
  );
}

export default TaskCreate;
