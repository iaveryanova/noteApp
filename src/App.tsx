import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import AppRoutes from "./components/AppRoutes";
import NavBar from "./components/NavBar";
import { AlertState } from "./context/alert/AlertState";

export const App: React.FC = () => {
  return (
    <AlertState>
      <BrowserRouter>
      <NavBar />
      <div className="container pt-4">
        <Alert />
        <AppRoutes />
      </div>
    </BrowserRouter>
    </AlertState>
    
  );
}; 

export default App;
