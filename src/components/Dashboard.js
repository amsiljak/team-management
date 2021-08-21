import React, { useEffect, useState } from "react";
import { Label, ListGroup, Row, Col, Button } from "reactstrap";
import Task from "./Task";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const switchRoute = (link) => {
    history.push(link);
  };

  useEffect(() => {
    //withCredentials za cookie
    axios
      .get("http://localhost:3000/users/loggedUser", { withCredentials: "true" })
      .then((res) => {
        setUser(res.data);
      });

    axios
      .get("http://localhost:3000/tasks/getAllTasks", {
        withCredentials: "true",
      })
      .then((res) => {
        setToDoTasks(res.data.filter((task) => task.category === 0));
        setDoingTasks(res.data.filter((task) => task.category === 1));
        setDoneTasks(res.data.filter((task) => task.category === 2));
      });
  }, []);

  const handleSubmit = (e) => {
    switchRoute('/task-create')
  }

  return (
    <div>
      <Label tag="h1">Dashboard</Label>
      <Row className="mt-5">
        <Col ml-3>
          <ListGroup>
            <Label tag="h6" className="text-center">Otvoreno</Label>
            {toDoTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <Label tag="h6" className="text-center">U izradi</Label>
            {doingTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <Label tag="h6" className="text-center">Završeno</Label>
            {doneTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
      <Col>
        <Button color="dark"
          size="md"
          className="mt-2"
          onClick={handleSubmit}>+ Dodaj zadatak</Button>
          </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
