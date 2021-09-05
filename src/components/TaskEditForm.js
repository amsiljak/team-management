import React, { useState } from "react";
import "./Form.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

function TaskEditForm() {
  const history = useHistory();
  const location = useLocation();

  const switchRoute = (link) => {
    history.push(link);
  };

  const task = location.state.task;

  const initialFormData = {
    title: task.title,
    category: task.category,
    description: task.description,
  };

  const [formData, updateFormData] = React.useState(initialFormData);

  const initialformErrors = {
    title: false,
    description: false,
  };

  const [formErrors, updateFormErrors] = React.useState(initialformErrors);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    updateFormData({
      ...formData,
      [name]: e.target.value,
    });

    if (name === "title") {
      updateFormErrors({
        ...formErrors,
        [name]: value.length === 0,
      });
    } else if (name === "description") {
      updateFormErrors({
        ...formErrors,
        [name]: value.length > 200,
      });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (formData.title.length === 0) alert("Naziv zadatka je obavezno polje!");
    if (Object.values(formErrors).every((formError) => formError === false)) {
      axios
        .post(
          "http://localhost:3000/tasks/updateTask",
          {
            id: task.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
          },
          {
            withCredentials: "true",
          }
        )
        .then(() => {
          switchRoute("/");
        })
        .catch();
    }
  };

  const handleDelete = (e) => {
    axios
      .delete(
        "http://localhost:3000/tasks/",
        { data: { id: task.id } },
        { withCredentials: "true" }
      )
      .then(() => switchRoute("/"))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Label tag="h3" className="text-center login-label">
        Pregled zadatka
      </Label>
      <Form className="signup-form form center">
        <FormGroup className="pt-2">
          <Label for="title" className="mb-1 mt-1">Naziv</Label>
          <Input
            invalid={formErrors.title}
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
          <FormFeedback invalid>Naziv ne smije biti prazan!</FormFeedback>
        </FormGroup>
        <FormGroup className="pt-2">
          <Label for="category" className="mb-1 mt-1">
            Kategorija
          </Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Otvoreno</option>
            <option>U izradi</option>
            <option>Zavrseno</option>
          </Input>
        </FormGroup>
        <FormGroup className="pt-2">
          <Label for="title" className="mb-1 mt-1">Opis</Label>
          <Input
            invalid={formErrors.description}
            type="textarea"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
          <FormFeedback invalid>
            Opis ne smije duži od 200 karaktera!
          </FormFeedback>
        </FormGroup>
        <Button
          color="primary"
          size="md"
          className="block mt-4 mb-2"
          onClick={handleEdit}
        >
          Spremi izmjene
        </Button>
        <Button
          color="danger"
          size="md"
          className="block mb-4"
          onClick={handleDelete}
        >
          Obriši zadatak
        </Button>
      </Form>
    </div>
  );
}

export default TaskEditForm;
