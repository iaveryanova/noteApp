import React, {useEffect, useState} from "react";
import iNote from "./interfaces/iNote";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface NotesProps {
  notes: iNote[];
  onRemove: (id: string) => void;
  onUpdate: (id: string) => void;
  selectedTag: string|null;
}

const Notes: React.FC<NotesProps> = ({ notes, onRemove, onUpdate, selectedTag }) => {

  const [currentNotes, setCurrentNotes] = useState<iNote[]>(notes);

  useEffect(()=>{
    if(selectedTag){
      const arr = notes.filter((note)=>{
        if(note.tags){
          if(note?.tags.includes(selectedTag)){
            return note;
          }
        }
      });
      setCurrentNotes(arr);
    }
    else {
      setCurrentNotes(notes);
    }


  }, [selectedTag, notes]);

  return (
    <TransitionGroup component="ul" className="list-group">
      {currentNotes.map((note) => {
         const isoDateString = note.date;
         const date = new Date(isoDateString);
         const utcString = date.toUTCString();
        return (
          <CSSTransition 
          key={note.id} 
          classNames={"note"} 
          timeout={800}>
            <li className="list-group-item note">
            <div>
              <strong>{note.title}</strong>
              <small>{utcString}</small>
            </div>
            {note.tags?.map((tag, index) => (
              <div key={index} className='tag'>#{tag}</div>
            ))}

            <div>
              <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onRemove(note.id)}
              >
              delete
            </button>
            <button 
            type="button"
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => {
              onUpdate(note.id);
                    }}
                    >
              edit
            </button>
            </div>
            
          </li>
          </CSSTransition>
          
        )
      }
      )}
    </TransitionGroup>
  );
};

export default Notes;
