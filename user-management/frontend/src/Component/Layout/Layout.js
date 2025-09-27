import React from "react";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";

 function Layout() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      {/* Footer can be added here later */}
    </>
  );
}
export default Layout;
