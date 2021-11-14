import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import{
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import "../styling/home.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);

  const dispatch = useDispatch();
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };

  return (
    <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📗</h2>
          <h1>Rick and Morty's API</h1>
          <BrowserRouter>
            <Switch>
              <Route>
                <GoogleLogin
                  clientId="157247681273-qsb3carctpmmkercmvna4fdrl936s3k2.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="login__button"
                    ><Link to='/episode' className="login__button">
                      Iniciar sesion con Google
                      </Link>
                    </button>
                  )}
                  onSuccess={login}
                  onFailure={login}
                  isSignedIn={true}
                  cookiePolicy={"single_host_origin"}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;