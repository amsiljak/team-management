import React from "react";
import { Button, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Groups.css";
import GroupComponent from "../../components/Group/Group";

function Groups() {
  const switchRoute = (link) => {
    history.push(link);
  };

  const history = useHistory();

  const groupSelectedCallback = () => {
    switchRoute("/sign-up");
  };

  const groups = [
    { id: 1, number: 6, theme: "Bankarski sistem" },
    { id: 2, number: 3, theme: "Kino" },
    { id: 1, number: 6, theme: "Bankarski sistem" },
    { id: 2, number: 3, theme: "Kino" },
    { id: 1, number: 6, theme: "Bankarski sistem" },
    { id: 2, number: 3, theme: "Kino" },
  ];
  return (
    <div className="form">
      <h2 className="text-center mt-5">Pridružite se svojoj grupi</h2>
      <Label tag="p" size="md" className="text-center mt-1 mb-5">
        Odaberite grupu kojoj pripadate na predmetu OOAD
      </Label>
      <div>
        <a style={{ cursor: "pointer" }} onClick={groupSelectedCallback}>
          <div className="py-3 groups row">
            {groups.map((group) => (
              <GroupComponent key={group.id} group={group} />
            ))}
          </div>
        </a>
        <div className="new-group">
          <p className="text-center new-group-text">
            Ne vidite grupu kojoj pripadate?
          </p>
          <div className="text-center">
            <Button
              color="dark"
              size="md"
              className="center mb-5 px-5"
              onClick={() => switchRoute("/group-create")}
            >
              Kreiraj novu grupu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
