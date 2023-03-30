import React, {useState, useContext, useEffect} from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

interface FormProps {
  notes: Array<{ id: string, title: string, date: string, tags: string[] }>;
  selectedNoteId: string|null;
  onUpdateSelectedNoteId: (id: string|null) => void;
  // onSetSelectedTags: (tag: string|null) => void;
  // tags: string[];
}

const Form: React.FC<FormProps> = ({notes, selectedNoteId, onUpdateSelectedNoteId}) => {

  // const uniqueTags: { [key: string]: boolean } = {};
  // for (const note of notes) {
  //   for (const tag of note.tags) {
  //     uniqueTags[tag] = true;
  //   }
  // }

  // tags = Object.keys(uniqueTags);
  // @ts-ignore
  // onSetSelectedTags(tags);
  // console.log(notes);
  // setTags(tg);

  useEffect(()=>{
    if(selectedNoteId){
      notes.forEach((note) => {
        if(note.id === selectedNoteId){
          setValue(note.title);
        }
      });
    }
  },[selectedNoteId]);

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
      alert.show('Введите название заметки');
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
      {/*<select className="form-select me-2" aria-label="Выберите тег" onChange={(e) => onSetSelectedTags(e.target.value)}>*/}
      {/*  <option value="">Все теги</option>*/}
      {/*  {tags?.map((tag, index) => (*/}
      {/*    <option key={index} value={tag}>{tag}</option>*/}
      {/*  ))}*/}
      {/*</select>*/}
    </>
  );
};

export default Form;
