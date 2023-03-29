import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary ps-4">
      <ul className="navbar-nav">
        
        <div className="navbar-brand">Note App</div>

        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Главная
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            Информация
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
