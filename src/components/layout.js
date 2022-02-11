import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="page-container">
            <div className="navbar"><Header /></div>
            <div className="content-wrap"> <Outlet /></div>
            <div className="footer"><Footer /></div>
        </div>
    )
};

export default Layout;