import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES } from "../types";

interface FirebaseStateProps {
  children: React.ReactNode
}

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState: React.FC<FirebaseStateProps> = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    try {
      const res = await axios.get(`${url}/notes.json`);
      const payload = Object.keys(res.data).map(key => ({ ...res.data[key], id: key }));
      dispatch({ type: FETCH_NOTES, payload });
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title: string) => {

    console.log('addnote');
    const note = {
      title,
      date: new Date().toJSON(),
    };
    try {
      const res = await axios.post(`${url}/notes.json`, note);
      const payload = {
        ...note,
        id: res.data.name,
      };
      dispatch({ type: ADD_NOTE, payload });
      return res;
    } catch (error) {
      console.log(error);
    }

  };

  const removeNote = async (id: string) => {
    try {
      await axios.delete(`${url}/notes/${id}.json`);
      dispatch({ 
        type: REMOVE_NOTE,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        fetchNotes,
        addNote,
        removeNote,
        loading:state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
