import React from "react";
import MyProfileForm from "../components/MyProfileForm";

function MyProfile(props) {
  return (
    <div>
      <MyProfileForm user={props.user}/>
    </div>
  );
}

export default MyProfile;
