import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Login.css';

function Login() {
    return (
        <div>
            <Form className="login-form rounded" >
                <Label tag = "h1" className="text-center">Login</Label>
                <FormGroup className="pt-3">
                    <Input type="email" name="email" placeholder="Email adress"  />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Input type="password" name="password" placeholder="Password"  />
                </FormGroup>
                <Button color="dark" size="lg" className="block mt-3">Login</Button>
                <div className="text-center mt-2 mb-5">
                    <a href="/sign-up">Nemate račun?</a>
                </div>
            </Form>
        </div>
    );
}
export default Login;