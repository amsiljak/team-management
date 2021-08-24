import React, { useEffect, useState } from "react";
import { Label, ListGroup, Row, Col, Button, Container } from "reactstrap";
import Task from "./Task";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Form.css";

function Dashboard() {
  const history = useHistory();
  const [toDoTasks, setToDoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const switchRoute = (link) => {
    history.push(link);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks/getAllTasks", {
        withCredentials: "true",
      })
      .then((res) => {
        setToDoTasks(res.data.filter((task) => task.category.toString() === "Otvoreno"));
        setDoingTasks(res.data.filter((task) => task.category === "U izradi"));
        setDoneTasks(res.data.filter((task) => task.category === "Zavrseno"));
      });
  }, []);

  const handleSubmit = (e) => {
    switchRoute("/task-create");
  };

  return (
    <div>
      <Label tag="h1" style={{ fontSize: "160%" }} className="mx-3 mt-4">
        Dashboard
      </Label>
      <Container>
        <Row className="mt-3">
          <Col lg="4" md="4" sm="6" className="mt-3">
            <ListGroup>
              <Label tag="p" className="text-center">
                Otvoreno
              </Label>
              <span className="form px-4 py-3" style={{ minHeight: "300px" }}>
                {toDoTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </span>
            </ListGroup>
          </Col>
          <Col lg="4" md="4" sm="6" className="mt-3">
            <ListGroup>
              <Label tag="p" className="text-center">
                U izradi
              </Label>
              <span className="form px-4 py-3" style={{ minHeight: "300px" }}>
                {doingTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </span>
            </ListGroup>
          </Col>
          <Col lg="4" md="4" sm="6" className="mt-3">
            <ListGroup>
              <Label tag="p" className="text-center">
                Završeno
              </Label>
              <span className="form px-4 py-3" style={{ minHeight: "300px" }}>
                {doneTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </span>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              color="dark"
              size="md"
              className="mt-5 mb-4"
              onClick={handleSubmit}
            >
              + Dodaj zadatak
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
