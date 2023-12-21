import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "../../Header/Header";

const Layout = () => {
  const [auth, setAuth] = useState("");
  return (
    <div>
      <Header auth={auth} setAuth={setAuth} />

      <Outlet />
    </div>
  );
};

export default Layout;
