import React, { createContext, useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";

interface Alert {
  text: string;
  type: string;
  visible: boolean;
}

const Alert: React.FC = () => {
  const { alert, hide } = useContext(AlertContext);

  if (!alert?.visible) {
    return null;
  }

  return (
    <div
      className={`alert alert-${
        alert?.type || "warning"
      } alert-dismissible fade show d-flex justify-content-between`}
      role="alert"
    >
        <span>
             <strong>Внимание! </strong>
      {alert.text}
        </span>
     
      
      <button
        onClick={hide}
        type="button"
        className="btn btn-outline-secondary btn-sm"
        aria-label="Close"
        data-dismiss="alert"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
