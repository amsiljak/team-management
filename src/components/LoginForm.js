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
import "./Form.css"
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { useHistory } from "react-router-dom";

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

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: formData.email,
      password: formData.password,
    };
    
    switchRoute("/")
  };

  return (
    <div>
      <Label tag="h1" className="text-center login-label">
        LOGIN
      </Label>
      <Form className="login-form form rounded border">
        <InputGroup className="pt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <HiOutlineMail className="mb-1 mt-1" />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="email" name="email" placeholder="Email adress" value={formData.email} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="pt-3 pb-2">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <AiOutlineLock className="mb-1 mt-1" />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </InputGroup>
        <Button color="dark" size="lg" className="block mt-2" onClick={handleSubmit}>
          Login
        </Button>
        <div className="text-center mt-2 mb-4">
          <a href="/sign-up" className="small">Nemate račun? Registrujte se</a>
        </div>
      </Form>
    </div>
  );
}
export default Login;
