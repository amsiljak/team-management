import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function Signup () {
    const history = useHistory();
    
    const switchRoute = (link) => {
        history.push(link);
    };

    return (
        <div>
            <Form className="login-form rounded" >
                <Label tag = "h1" className="text-center">Sign up</Label>
                <h5 className="text-center pt-3">Kao prvi korak, unesite svoje lične podatke</h5>
                <FormGroup className="pt-2">
                    <Label for="name">Ime</Label>
                    <Input type="text" name="name" id="name" />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Label for="lastname">Prezime</Label>
                    <Input type="text" name="lastname" id="lastname"  />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Label for="email">Email adresa</Label>
                    <Input type="email" name="email" id="email" />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Label for="repeatedpassword">Ponovite svoj password</Label>
                    <Input type="password" name="repeatedpassword" id="repeatedpassword" />
                </FormGroup>
                <Button color="dark" size="lg" className="block mt-3" onClick={()=>switchRoute('/groups')}>Nastavi</Button>
            </Form>
        </div>
    );
};
export default Signup;