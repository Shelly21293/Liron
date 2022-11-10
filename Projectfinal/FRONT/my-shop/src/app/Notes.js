import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getNotesAsync,selectNotes} from './app/notesSlice';
import {selectStaff,selectToken} from './app/loginSlice';

const Notes = () => {
    const dispatch=useDispatch();
    const token = useSelector(selectToken);
    const notes = useSelector(selectNotes);
    const staff = useSelector(selectStaff);


    return (
        <div>
            is staff:{staff? "true":"falseee"}
            {notes.length>0 && notes.map(note=><div>{note.body}{""}{note.user}</div>)}
            <button onClick={()=>dispatch(getNotesAsync(token))}>Get data</button>
        </div>)
}

export default Notes;