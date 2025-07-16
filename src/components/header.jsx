import React from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-container">
        <div className="header-left">
          <UsergroupAddOutlined className="header-icon" />
          <h1 className="header-title">Manage Your Users Seamlessly</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

