import { createContext } from "react";

type FirebaseContextType = {
  notes: any[];
  loading: boolean;
  showLoader: () => void;
  fetchNotes: () => void;
  addNote: (title: string) => void;
  removeNote: (id: string) => void;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  notes: [],
  loading: false,
  showLoader: () => {},
  fetchNotes: () => {},
  addNote: (title: string) => {console.log('blabla')},
  removeNote: (id: string) => {},
});