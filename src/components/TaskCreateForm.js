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
import { useHistory } from "react-router-dom";

function TaskCreateForm() {
  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  const initialFormData = {
    title: "",
    category: "Otvoreno",
    description: "",
  };

  const [formData, updateFormData] = React.useState(initialFormData);

  const initialformErrors = {
    title: false,
    category: false,
    description: false,
  };

  const [formErrors, updateFormErrors] = React.useState(initialformErrors);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    updateFormData({
      ...formData,
      [name]: e.target.value.trim(),
    });

    var error;
    if (name === "title") error = value.length === 0;
    // else if (name === "email") error = !validEmail.test(value);
    // else if (name === "password")
    //   error = !(value.length >= 8 && value.length <= 20);
    // else if (name === "repeatedpassword") error = value !== formData.password;

    updateFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
    };

    if (task.title.length === 0) alert("Naziv zadatka je obavezno polje!");

    if (Object.values(formErrors).every((formError) => formError === false)) {
      axios
        .post("http://localhost:3000/tasks/createTask", task)
        .then(() => {
          switchRoute("/");
        })
        .catch();
    }
  };

  return (
    <div>
      <Label tag="h1" className="text-center login-label">
        Novi Zadatak
      </Label>
      <Form className="signup-form form">
        <FormGroup className="pt-2">
          <Label for="title">Naziv</Label>
          <Input
            invalid={formErrors.title}
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
          <FormFeedback invalid>Naziv ne smije biti prazan</FormFeedback>
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
          <Label for="title">Opis</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          color="dark"
          size="lg"
          className="block mt-4 mb-5"
          onClick={handleSubmit}
        >
          Dodaj zadatak
        </Button>
      </Form>
    </div>
  );
}

export default TaskCreateForm;
