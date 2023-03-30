import React, {useState, useContext, useEffect} from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import iNote from "./interfaces/iNote";

interface FormProps {
  notes: iNote[];
  selectedNoteId: string|null;
  onUpdateSelectedNoteId: (id: string|null) => void;
}

const Form: React.FC<FormProps> = ({notes, selectedNoteId, onUpdateSelectedNoteId}) => {

  const [tags, setTags] = useState<string[]>([]);

  useEffect(()=>{
    if(selectedNoteId){
      notes.forEach((note) => {
        if(note.id === selectedNoteId){
          setValue(note.title);
        }
      });
    }
  },[selectedNoteId]);

  useEffect(()=>{
    const uniqueTags: { [key: string]: boolean } = {};
    if(notes){

      notes.forEach((note) => {
        if(note.tags){
          note.tags.forEach((tag) => {
            uniqueTags[tag] = true;
          })
        }
      });

      const allTags = Object.keys(uniqueTags);
      setTags(allTags);
    }

  }, [notes])

  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext)

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (value.trim()) {
      try {
        if(selectedNoteId){
          await firebase.updateNote(selectedNoteId, value.trim());
        }
        else{
          await firebase.addNote(value.trim());
        }
        onUpdateSelectedNoteId(null);
        //@ts-ignore
        alert.show('Заметка была создана', 'success');
      } catch (error) {
        //@ts-ignore
        alert.show('Что-то пошло не так', 'danger');
      }
      setValue('');
    } else {
      //@ts-ignore
      alert.show('Введите заметку');
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <textarea
            className='form-control'
            placeholder='Введите заметку'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary">
              {selectedNoteId ? 'Сохранить' : 'Создать'}
          </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
