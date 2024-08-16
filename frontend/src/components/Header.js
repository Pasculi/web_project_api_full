import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({
  loggedIn,
  handleLogout,
  currentEmail,
}) {

  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Logo Around" />
        {loggedIn ? (
          <>
            <div className="header__status">
              <p className="header__user">{currentEmail}</p>

              <Link
                to="/"
                className="header__session"
                href="#"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Link>
            </div>
          </>
        ) : (
          <>
            {path === "/signin" ? (
              <Link className="header__session" to="/signup">
                Regístrate
              </Link>
            ) : path === "/signup" ? (
              <Link className="header__session" to="/signin">
                Inicia sesión
              </Link>
            ) : null}
          </>
        )}

        <div className="header__line"></div>
      </header>
    </>
  );
}
