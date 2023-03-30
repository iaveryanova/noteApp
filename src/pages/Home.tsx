import React, {Fragment, useContext, useEffect, useState} from 'react'
import Form from '../components/Form'
import Loader from '../components/Loader';
import Notes from '../components/Notes'
import { FirebaseContext } from '../context/firebase/firebaseContext';


const Home = () => {
     
const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext);

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string|null>(null);

  const fetchNotesAndTags = async() =>{
    console.log('1');
    await fetchNotes();
  
  }
  
  useEffect(() => {
    fetchNotesAndTags();
  }, [])

  return (
   <Fragment>
    <Form
      notes={notes}
      selectedNoteId={selectedNoteId}
      onUpdateSelectedNoteId={setSelectedNoteId}
      // tags={tags}
      // onSetSelectedTags={setSelectedTags}
    />

    <hr/>

    {loading
    ? <Loader />
   :
    <Notes notes={notes} onRemove={removeNote} onUpdate={setSelectedNoteId}  />
    }

   </Fragment>
  )
}

export default Home;
