import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import{
    BrowserRouter,
    Switch,
    Route,
    Link,
  } from 'react-router-dom';

import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("Episode");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">Rick and Morty 💬</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Busca un episodio"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Buscar
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <BrowserRouter>
            <Switch>
              <Route>
                <GoogleLogout
                  clientId="57529085775-fk8rn8hren1q8o5ja2idq4m7hug5aong.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="logout__button"
                    ><Link to='' className="logout__button">
                      Cerrar sesion
                      </Link>
                    </button>
                  )}
                  onLogoutSuccess={logout}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      ) : (
        <h1 className="notSignedIn">Usuario no inicializado</h1>
      )}
    </div>
  );
};

export default Navbar;