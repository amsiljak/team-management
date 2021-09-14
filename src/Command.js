import axios from "axios";

class TaskCommand {
  constructor() {
    this.history = [];
  }

  executeCommand(command) {
    this.history.push(command);
    return command.execute().then((res) => res.data);
  }

  undo() {
    const command = this.history.pop();
    command.undo();
  }
}

class DeleteCommand {
  constructor(task) {
    this.task = task;
  }

  execute() {
    return axios
      .delete(
        "http://localhost:3000/tasks/",
        { data: { id: this.task.id } },
        { withCredentials: "true" }
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  undo() {
    return axios
      .post(
        "http://localhost:3000/tasks/createTask",
        {
          title: this.task.title,
          category: this.task.category,
          description: this.task.description,
        },
        {
          withCredentials: "true",
        }
      )
      .then(() => {})
      .catch();
  }
}

export {
    TaskCommand,
    DeleteCommand
}