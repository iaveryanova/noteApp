import React, { useReducer, ReactNode } from "react";
import { AlertContext } from "./alertContext";
import alertReducer from './alertReducer';
import { HIDE_ALERT, SHOW_ALERT } from '../types';

type AlertStateProps = {
  children: ReactNode;
};

type AlertType = {
  visible: boolean;
  text: string;
  type: string;
}; 

type AlertContextType = {
  show: (text?: string, type?: string) => void;
  hide: () => void;
  alert: AlertType;
};

export const AlertState = ({ children }: AlertStateProps) => {
  const [state, dispatch] = useReducer(alertReducer, { visible: false });

  const show = (text: '', type = 'warning') => {
    dispatch({
      type: SHOW_ALERT,
      //@ts-ignore
      payload: { text, type }
    });
  };

  const hide = () => dispatch({ type: HIDE_ALERT });

  return (
    //@ts-ignore
    <AlertContext.Provider value={{ show, hide, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};