import React from 'react';
import {
    Button, CardColumns, Label
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

    const groups = [{id:1, number: 6, theme: "Bankarski sistem"}, {id:2, number: 3, theme: "Kino"}]
    return (
        <div>
            <h4 className="text-center">Odaberite grupu kojoj pripadate na predmetu OOAD</h4>
            <div>
                <a style={{ cursor: 'pointer' }} onClick={groupSelectedCallback}>
                    <CardColumns className="pt-5">
                        {groups.map(group => <Group key={group.id} group={group}/>)}
                    </CardColumns>
                </a>
                <Label tag = "p" size="sm" className="text-center pt-5">Ne vidite svoju grupu?</Label>
                <div className="text-center">
                    <Button color="dark" size="md" className="center" onClick={switchRoute("/group-create")}>Kreiraj novu grupu</Button>
                </div>
            </div>
        </div>
    );
};
export default Groups;