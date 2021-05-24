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
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Form.css";
import { BsCursorText } from "react-icons/bs";

function GroupCreate() {
  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  const initialFormData = {
    no: "",
    theme: "",
    tutorialday: "",
  };

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      no: formData.no,
      theme: formData.theme,
      tutorialday: formData.tutorialday,
    };

    switchRoute("/");
  };

  return (
    <>
      <Label tag="h1" className="text-center pt-5 pb-3">
        Nova grupa
      </Label>
      <Form className="group-create-form form rounded">
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
            <Input
              type="text"
              name="theme"
              id="theme"
              value={formData.theme}
              onChange={handleChange}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <BsCursorText className="mb-1 mt-1" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup className="pt-2 pb-4">
          <Label for="tutorialday" className="mb-1 mt-1">
            Dan održavanja tutorijala
          </Label>
          <Input
            type="select"
            name="select"
            id="tutorialday"
            value={formData.tutorialday}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Odaberite dan
            </option>
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
