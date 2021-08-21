import React, {useState, createContext} from "react"

export const NotesContext = React.createContext();
export const NotesProvider = (props) =>{
    
        const [notes,setNotes] = useState({})
        
    return(
<NotesContext.Provider value={[notes,setNotes]}>
{props.children}
</NotesContext.Provider>
    );
}