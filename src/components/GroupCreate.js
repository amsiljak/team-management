import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function GroupCreate  () {
    const history = useHistory();

    const switchRoute = (link) => {
        history.push(link);
    };

    return (
        <Form className="login-form rounded" body inverse style={{ backgroundColor: '#ffffff'}}>
                <Label tag = "h1" className="text-center">Kreiranje grupe</Label>
                <FormGroup className="pt-2">
                    <Label for="no">Broj grupe</Label>
                    <Input type="number" min="1" name="no" id="no" />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Label for="theme">Tema</Label>
                    <Input type="text" name="theme" id="theme"  />
                </FormGroup>
                <FormGroup className="pt-2">
                    <Label for="tutorialday">Dan održavanja tutorijala</Label>
                    <Input type="select" name="select" id="tutorialday">
                        <option>Ponedjeljak</option>
                        <option>Utorak</option>
                        <option>Srijeda</option>
                        <option>Cetvrtak</option>
                        <option>Petak</option>
                    </Input>
                </FormGroup>
                <Button color="dark" size="lg" className="block mt-3" onClick={()=>switchRoute('/dashboard')}>Kreiraj grupu</Button>
        </Form>
    );
};
export default GroupCreate;