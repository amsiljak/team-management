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
import { useHistory } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import { validEmail } from "../regex.js";
import axios from "axios";
import "./Form.css";
var User = require("../User.js");

function Signup() {
  const history = useHistory();

  const initialFormData = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatedpassword: "",
  };

  const [formData, updateFormData] = React.useState(initialFormData);

  const initialformErrors = {
    name: false,
    lastname: false,
    email: false,
    password: false,
    repeatedpassword: false,
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
    if (name === "name" || name === "lastname") error = value.length === 0;
    else if (name === "email") error = !validEmail.test(value);
    else if (name === "password")
      error = !(value.length >= 8 && value.length <= 20);
    else if (name === "repeatedpassword") error = value !== formData.password;

    updateFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = new User.UserBuilder(formData.email)
      .setName(formData.name)
      .setLastname(formData.lastname)
      .setPassword(formData.password)
      .build();

    if (
      user.name.length === 0 ||
      user.lastname.length === 0 ||
      user.email.length === 0 ||
      user.password.length === 0
    )
      alert("Sva polja moraju biti popunjena!");

    if (Object.values(formErrors).every((formError) => formError === false)) {
      axios.get("http://localhost:3000/users").then((res) => {
        if (res.data.every((user) => user.email !== formData.email)) {
          axios
            .post("http://localhost:3000/users/createUser", user)
            .then((res) => {
              history.push({
                pathname: "/groups",
                state: { id: res.data },
              });
            })
            .catch();
        } else alert("Ve?? postoji korisnik sa unesenim emailom!");
      });
    }
  };

  return (
    <div>
      <div>
        <Label tag="h2" className="text-center mt-5 class-name">
          Kreiranje ra??una
        </Label>
        <Label tag="p" size="md" className="text-center mt-1 mb-4">
          Kao prvi korak, unesite svoje li??ne podatke
        </Label>
        <Form className="signup-form form center">
          <FormGroup className="pt-2">
            <Label for="name">Ime</Label>
            <Input
              invalid={formErrors.name}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormFeedback invalid>Ime ne smije biti prazno</FormFeedback>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="lastname">Prezime</Label>
            <Input
              invalid={formErrors.lastname}
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <FormFeedback invalid>Prezime ne smije biti prazno</FormFeedback>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="email">Email adresa</Label>
            <InputGroup>
              <Input
                invalid={formErrors.email}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <HiOutlineMail className="mb-1 mt-1" />
                </InputGroupText>
              </InputGroupAddon>
              <FormFeedback invalid>Unesite validnu email adresu!</FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup className="pt-2">
            <Label for="password">Password</Label>
            <InputGroup>
              <Input
                invalid={formErrors.password}
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*********"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <AiOutlineLock className="mb-1 mt-1" />
                </InputGroupText>
              </InputGroupAddon>
              <FormFeedback invalid>
                ??ifra mora imati izme??u 8 i 20 karaktera!
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup className="pt-2 pb-1">
            <Label for="repeatedpassword">Ponovite password</Label>
            <InputGroup>
              <Input
                invalid={formErrors.repeatedpassword}
                type="password"
                name="repeatedpassword"
                id="repeatedpassword"
                value={formData.repeatedpassword}
                onChange={handleChange}
                placeholder="*********"
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <AiOutlineLock className="mb-1 mt-1" />
                </InputGroupText>
              </InputGroupAddon>
              <FormFeedback invalid>??ifre se ne podudaraju</FormFeedback>
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
