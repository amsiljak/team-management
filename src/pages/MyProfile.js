import React from "react";
import MyProfileForm from "../components/MyProfileForm";
import Navbar from "../components/Navbar";

function MyProfile(props) {
  return (
    <div>
      <Navbar />
      <MyProfileForm user={props.user} />
    </div>
  );
}

export default MyProfile;
