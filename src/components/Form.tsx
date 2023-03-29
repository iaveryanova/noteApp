import React, { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

const Form: React.FC = () => {
  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext)

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (value.trim()) {
      try {
        console.log('addnotbefore',firebase);
        let gg = await firebase.addNote(value.trim());
        console.log(gg);
        //@ts-ignore
        alert.show('Заметка была создана', 'success');
      } catch (error) {
        console.log(error);
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
    <form onSubmit={submitHandler}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Введите название заметки'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Form;
