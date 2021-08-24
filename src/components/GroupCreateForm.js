import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import "./Form.css";
import { BsCursorText } from "react-icons/bs";
import axios from "axios";

function GroupCreate() {
  const history = useHistory();
  const location = useLocation();

  const switchRoute = (link) => {
    history.push(link);
  };

  const initialFormData = {
    no: "1",
    theme: "",
    tutorialday: "Ponedjeljak",
  };

  const [formData, updateFormData] = React.useState(initialFormData);

  const initialFormErrors = {
    theme: false,
  };

  const [formErrors, updateFormErrors] = React.useState(initialFormErrors);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    updateFormData({
      ...formData,
      [name]: value,
    });

    var error;
    if (name === "theme") {
      error = !(value.length > 0 && value.length < 50);

      updateFormErrors({
        ...formErrors,
        theme: error,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.theme.length === 0) alert("Morate unijeti temu projekta!");
    else if (formErrors.theme === false) {
      const group = {
        no: formData.no,
        theme: formData.theme,
        tutorialday: formData.tutorialday,
      };

      axios
        .post("http://localhost:3000/groups/createGroup", group)
        .then((res) => {
          history.push({
            pathname: "/groups",
            state: { id: location.state.id },
          });
        })
        .catch();
    }
  };

  return (
    <>
      <Label tag="h2" className="text-center pt-5">
        Kreiranje grupe
      </Label>
      <Label tag="p" size="md" className="text-center mt-1 mb-4">
        Unesite podatke o svojoj grupi
      </Label>
      <Form className="group-create-form form center rounded">
        <FormGroup className="pt-2">
          <Label for="no" className="mb-1 mt-2">
            Broj grupe
          </Label>
          <Input
            type="number"
            min="1"
            name="no"
            id="no"
            value={formData.no}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className="pt-2">
          <Label for="theme" className="mb-1 mt-1">
            Tema projekta
          </Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <BsCursorText className="mb-1 mt-1" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              invalid={formErrors.theme}
              type="text"
              name="theme"
              id="theme"
              value={formData.theme}
              onChange={handleChange}
            />
            <FormFeedback invalid>
              Tema projekta mora imati od 0 do 50 karaktera
            </FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="pt-2 pb-4">
          <Label for="tutorialday" className="mb-1 mt-1">
            Dan održavanja tutorijala
          </Label>
          <Input
            type="select"
            name="tutorialday"
            id="tutorialday"
            value={formData.tutorialday}
            onChange={handleChange}
          >
            <option>Ponedjeljak</option>
            <option>Utorak</option>
            <option>Srijeda</option>
            <option>Cetvrtak</option>
            <option>Petak</option>
          </Input>
        </FormGroup>
        <Button
          color="dark"
          size="lg"
          className="block mb-5"
          onClick={handleSubmit}
        >
          Kreiraj grupu
        </Button>
      </Form>
    </>
  );
}
export default GroupCreate;
