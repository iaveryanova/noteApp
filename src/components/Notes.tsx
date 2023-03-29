import React from "react";

interface NotesProps {
  notes: Array<{ id: string, title: string, date: string }>;
  onRemove: (title: string) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, onRemove }) => {
  return (
    <ul className="list-group">
      {notes.map((note) => (
        <li className="list-group-item note" key={note.id}>
          <div>
            <strong>{note.title}</strong>
            <small>{note.date}</small>
          </div>

          <button 
          type="button" 
          className="btn btn-outline-danger btn-sm"
          onClick={() => onRemove(note.id)}>
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Notes;
