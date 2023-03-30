import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import AppRoutes from "./components/AppRoutes";
import NavBar from "./components/NavBar";
import { AlertState } from "./context/alert/AlertState";
import {FirebaseState} from "./context/firebase/FirebaseState";

export const App: React.FC = () => {
  return (
    <FirebaseState>
      <AlertState>
        <BrowserRouter>
        <NavBar />
        <div className="container pt-4">
          <Alert />
          <AppRoutes />
        </div>
      </BrowserRouter>
      </AlertState>
    </FirebaseState>
    
  );
}; 

export default App;
