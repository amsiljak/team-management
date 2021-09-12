import React, { useEffect } from "react";
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
} from "reactstrap";
import "./Form.css";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { validEmail } from "../regex.js";

var User = require("../User.js");

function Login() {
  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  const initialFormData = {
    email: "",
    password: "",
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
      [e.target.name]: e.target.value.trim(),
    });

    var error;
    if (name === "email") {
      error = !validEmail.test(value);

      updateFormErrors({
        ...formErrors,
        email: error,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email.length === 0) alert("Morate unijeti email!");
    else if (formData.password.length === 0) alert("Morate unijeti šifru!");
    else if (formErrors.email === false) {
      let user = new User.UserBuilder(formData.email)
        .setPassword(formData.password)
        .build();

      axios
        .post("http://localhost:3000/users/login", user)
        .then((res) => {
          if (res.data.message === "Fail") alert("Pogrešan email ili šifra");
          else {
            localStorage.setItem("user", JSON.stringify(res.data));
            switchRoute("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Pogrešan email ili šifra");
        });
    }
  };

  return (
    <div>
      <Label tag="h1" className="text-center login-label">
        LOGIN
      </Label>
      <Form className="login-form form center rounded border">
        <InputGroup className="pt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <HiOutlineMail className="mb-1 mt-1" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            invalid={formErrors.email}
            type="email"
            name="email"
            placeholder="Email adresa"
            value={formData.email}
            onChange={handleChange}
          />
          <FormFeedback invalid>Unesite validnu email adresu!</FormFeedback>
        </InputGroup>
        <InputGroup className="pt-3 pb-2">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <AiOutlineLock className="mb-1 mt-1" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="password"
            name="password"
            placeholder="Sifra"
            value={formData.password}
            onChange={handleChange}
          />
        </InputGroup>
        <Button
          color="dark"
          size="lg"
          className="block mt-2"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <div className="text-center mt-2 mb-4">
          <a href="/sign-up" className="small">
            Nemate račun? Registrujte se
          </a>
        </div>
      </Form>
    </div>
  );
}
export default Login;
