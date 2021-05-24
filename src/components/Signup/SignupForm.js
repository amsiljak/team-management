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
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import "../Form.css"

function Signup() {
  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  const initialFormData = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatedpassword: "",
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
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    switchRoute("/groups")
  };

  return (
    <div>
      <div>
        <Label tag="h1" className="text-center mt-5 mb-4 class-name">
          Registracija
        </Label>
        <Form className="signup-form form">
          <h5 className="text-center pt-3">
            Kao prvi korak, unesite svoje lične podatke
          </h5>
          <FormGroup className="pt-2">
            <Label for="name">Ime</Label>
            <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="lastname">Prezime</Label>
            <Input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange}/>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="email">Email adresa</Label>
            <InputGroup>
              <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <HiOutlineMail className="mb-1 mt-1" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="password">Password</Label>
            <InputGroup>
              <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <AiOutlineLock className="mb-1 mt-1" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup className="pt-2 pb-1">
            <Label for="repeatedpassword">Ponovite password</Label>
            <InputGroup>
              <Input
                type="password"
                name="repeatedpassword"
                id="repeatedpassword"
                value={formData.repeatedpassword} onChange={handleChange}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <AiOutlineLock className="mb-1 mt-1" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <Button
            color="dark"
            size="lg"
            className="block mt-4 mb-5"
            onClick={handleSubmit}
          >
            Nastavi
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Signup;
