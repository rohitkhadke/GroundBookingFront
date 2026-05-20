import React from "react";

import PublicNav from "./PublicNav";

import { UserNav } from "./UserNav";

import AdminNAv from "./AdminNAv";
import { useLocation } from "react-router-dom";


const MainNavbar = () => {

const location = useLocation();


    
  const user =
    JSON.parse(localStorage.getItem("userinfo"));

  // NOT LOGGED IN
  if (!user) {
    return <PublicNav />;
  }

  // ADMIN
  if (user.role === "admin") {
    return <AdminNAv />;
  }

  // USER
  return <UserNav />;

};

export default MainNavbar;