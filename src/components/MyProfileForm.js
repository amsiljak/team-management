import React, { useEffect, useState } from "react";
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

function MyProfileForm(props) {
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/users/loggedInUser", {
  //       withCredentials: "true",
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //         setUser(res.data);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  const initialFormData = {
    name: props.user.name,
    lastname: props.user.lastname,
    email: props.user.email,
  };

  const [formData, updateFormData] = useState(initialFormData);

  const initialformErrors = {
    name: false,
    lastname: false,
    email: false,
  };

  const [formErrors, updateFormErrors] = useState(initialformErrors);

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

    updateFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
    };

    if (
      user.name.length === 0 ||
      user.lastname.length === 0 ||
      user.email.length === 0
    )
      alert("Sva polja moraju biti popunjena!");

    if (Object.values(formErrors).every((formError) => formError === false)) {
      axios
        .post("http://localhost:3000/users/updateUser", user)
        .then((res) => {
          switchRoute("/");
        })
        .catch();
    }
  };

  const handleGroupChange = (e) => {
    history.push({
      pathname: "/groups",
      state: { id: props.user.id, groupid: props.user.groupid },
    });
  }

  return (
    <div>
      <div>
        <Label tag="h2" className="text-center mt-5 class-name">
          Pregled profila
        </Label>
        <Form className="signup-form form center mt-3">
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
          <Button
            color="primary"
            size="md"
            className="block mt-4 mb-1"
            onClick={handleSubmit}
          >
            Spremi izmjene
          </Button>
          <div className="text-center mt-2 mb-4">
            <a onClick={handleGroupChange} className="small" style={{ cursor: "pointer" }}>
              Želite promijeniti grupu?
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default MyProfileForm;
