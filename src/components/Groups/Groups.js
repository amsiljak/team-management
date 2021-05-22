import React from 'react';
import {
    Button, CardDeck, CardGroup, Label
  } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './Groups.css';
import Group from '../Group.js'

function Groups  () {
    const switchRoute = (link) => {
        history.push(link);
    };

    const history = useHistory();

    const groupSelectedCallback = () => {
        switchRoute('/sign-up');
    }

    const groups = [{id:1, number: 6, theme: "Bankarski sistem"}, {id:2, number: 3, theme: "Kino"},{id:1, number: 6, theme: "Bankarski sistem"}, {id:2, number: 3, theme: "Kino"},{id:1, number: 6, theme: "Bankarski sistem"}, {id:2, number: 3, theme: "Kino"}]
    return (
        <div className="form">
            <Label tag = "p" size="lg" className="text-center mt-5">Odaberite grupu kojoj pripadate na predmetu OOAD</Label>
            <div>
                <a style={{ cursor: 'pointer' }} onClick={groupSelectedCallback}>
                    <div className="py-3 grupe row">
                        {groups.map(group => <Group key={group.id} group={group}/>)}
                    </div>
                </a>
                <div className="newGroup">
                    <p className="text-center">Ne vidite svoju grupu?</p>
                    <div className="text-center">
                        <Button color="dark" size="md" className="center mb-5" onClick={() => switchRoute("/group-create")}>Kreiraj novu grupu</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Groups;