import React from "react";
import { useSelector } from "react-redux";
import{
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import EpisodeList from "./components/EpisodeList";
import Episode from "./components/Episode";
import Homepage from './components/Homepage';
import Navbar from "./components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import "./styling/app.css";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);

    return (
      <div className="app">
        <Navbar />
        <Homepage />
        {isSignedIn && <BrowserRouter>
          
          <Switch>
            <Route path="/episode/:id">
              <Episode />
            </Route>
            
            <Route path="/episode">
              <EpisodeList />
            </Route>
            
          </Switch>
        </BrowserRouter>
        }
      </div>
    );
  }

export default App;
