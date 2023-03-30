import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES, UPDATE_NOTE } from "../types";

interface FirebaseStateProps {
  children: React.ReactNode
}

const url = "https://notes-2217f-default-rtdb.firebaseio.com";

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

    const tagRegex = /#(\w+)/g;
    const text = title;
    const tags: string[] = [];
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      tags.push(match[1]);
    }

    const note = {
      title,
      tags,
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

  const updateNote = async (id: string, title: string) => {
    const tagRegex = /#(\w+)/g;
    const text = title;
    const tags: string[] = [];
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      tags.push(match[1]);
    }

    const note = {
      title,
      tags,
      date: new Date().toJSON(),
    };

    try {
      await axios.put(`${url}/notes/${id}.json`, note);
      const payload = {
        ...note,
        id,
      };
      dispatch({ type: UPDATE_NOTE, payload });
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
        updateNote,
        removeNote,
        loading:state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
