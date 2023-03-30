import { createContext } from "react";

type FirebaseContextType = {
  notes: any[];
  // tags: string[];
  loading: boolean;
  showLoader: () => void;
  fetchNotes: () => void;
  addNote: (title: string) => void;
  updateNote: (id: string, title: string) => void;
  removeNote: (id: string) => void;
};
const url = "https://notes-2217f-default-rtdb.firebaseio.com";

export const FirebaseContext = createContext<FirebaseContextType>({
  notes: [],
  // tags: [],
  loading: false,
  showLoader: () => {},
  fetchNotes: () => {},
  addNote: (title: string) => {},
  updateNote: (id: string, title: string) => {},
  removeNote: (id: string) => {},
});