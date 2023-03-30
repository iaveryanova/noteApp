import React, { useEffect, useState } from 'react'
import iNote from './interfaces/iNote';


interface SelectProps {
    notes: iNote[];
    selectedNoteId: string|null;
    onUpdateSelectedNoteId: (id: string|null) => void;
    onSetSelectedTag: (tag: string|null) => void;
  }
  
const TagsSelect:React.FC<SelectProps>  = ({notes, selectedNoteId, onUpdateSelectedNoteId, onSetSelectedTag}) => {

    const [tags, setTags] = useState<string[]>([]);


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
    
  return (
    <select
        className="form-select me-2"
        aria-label="Выберите тег"
        onChange={(e) => onSetSelectedTag(e.target.value)}>
        <option value="">Все теги</option>
        {tags?.map((tag, index) => (
          <option key={index} value={tag}>{tag}</option>
        ))}
      </select>
  )
}

export default TagsSelect