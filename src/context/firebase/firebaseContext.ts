import { createContext } from "react";

type FirebaseContextType = {
  notes: any[];
  loading: boolean;
  showLoader: () => void;
  fetchNotes: () => void;
  addNote: (title: string) => void;
  updateNote: (id: string, title: string) => void;
  removeNote: (id: string) => void;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  notes: [],
  loading: false,
  showLoader: () => {},
  fetchNotes: () => {},
  addNote: (title: string) => {},
  updateNote: (id: string, title: string) => {},
  removeNote: (id: string) => {},
});