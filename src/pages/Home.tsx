import React, {Fragment, useContext, useEffect, useState} from 'react'
import Form from '../components/Form'
import Loader from '../components/Loader';
import Notes from '../components/Notes'
import TagsSelect from '../components/TagsSelect';
import { FirebaseContext } from '../context/firebase/firebaseContext';


const Home = () => {
     
const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext);

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string|null>(null);

  useEffect(() => {
    fetchNotes();
  }, [])

  return (
   <Fragment>
    <Form
      notes={notes}
      selectedNoteId={selectedNoteId}
      onUpdateSelectedNoteId={setSelectedNoteId}
    />

    <hr/>

    {loading
    ? <Loader />
   :
    <Notes notes={notes} onRemove={removeNote} onUpdate={setSelectedNoteId} selectedTag = {selectedTag} />
    }

<hr />
<TagsSelect notes={notes}
      selectedNoteId={selectedNoteId}
      onUpdateSelectedNoteId={setSelectedNoteId}
      onSetSelectedTag={setSelectedTag}/>
   </Fragment>
  )
}

export default Home;
