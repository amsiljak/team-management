import React from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    var category;
    switch (formData.category) {
      case "Otvoreno":
        category = "todo";
        break;
      case "U izradi":
        category = "inprogress";
        break;
      case "Zavrseno":
        category = "done";
        break;
    }
    
    if (formData.title.length === 0) alert("Naziv zadatka je obavezno polje!");
    if (Object.values(formErrors).every((formError) => formError === false)) {
      axios
        .post(
          "http://localhost:3000/tasks/createTask",
          {
            title: formData.title,
            category: category,
            description: formData.description,
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

  return (
    <div>
      <Label tag="h3" className="text-center login-label">
        Novi zadatak
      </Label>
      <Form className="signup-form form center">
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
          <Label for="title">Opis</Label>
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
