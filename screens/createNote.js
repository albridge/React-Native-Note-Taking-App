import * as React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react'
import CButton from '../components/CButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import noteDetails from './noteDetails';


function createNote({navigation}) {

  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])
  const [noteTitle, setNoteTitle] = useState('')

 

  const toStorage = (value) => {
    storeData(value)
  }

  const storeData = async (value) => {

    try {
      const jsonValue = await AsyncStorage.getItem('myNotes')
      let prev = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (prev !== null) {
        // let newStore=[...prev,value]
        prev.push(value);
        const jsonValue2 = JSON.stringify(prev)
        await AsyncStorage.setItem('myNotes', jsonValue2)
      } else {
        const jsonValue2 = JSON.stringify(value)
        await AsyncStorage.setItem('myNotes', jsonValue2)
      }
      navigation.navigate('Notes')

    } catch (e) {
      console.log('could not save to storage', e)
    }
  }

  const saveNote = () => {
      if(note=='' || noteTitle=='')
      {
          alert('Please enter a note title and body')
          return;
      }
    let noteId = uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'
    const newNote = {
      id: noteId,
      isCompleted: false,
      createdAt: Date.now(),
      title: noteTitle,
      note
    }
    let cam = [newNote, ...notes]
    setNotes([newNote, ...notes]);
    setNote('')
    setNoteTitle('')
    // console.log("new note is now", newNote);
    toStorage(newNote)    
  }




  return (
    
    <ScrollView style={styles.container}>
        <KeyboardAvoidingView>
      <Text style={styles.title}>BlueNotes</Text>
      <View>
        <TextInput
          placeholder="Title"
          onChangeText={text => setNoteTitle(text)}
          value={noteTitle}
          style={styles.noteTitle}    
        />
      </View>

      <View>
        <TextInput
          placeholder="Write note"
          multiline
          numberOfLines={10}
          onChangeText={text => setNote(text)}
          value={note}
          style={styles.note}
          textAlignVertical="top"
        />
      </View>

      <CButton title="Save Note" onPress={saveNote} bColor="#106276" /> 
      
    
      </KeyboardAvoidingView>
    </ScrollView>
   
  );
}

export default createNote;

const styles = StyleSheet.create({
  container: {
    // marginTop:50,
    flex: 1,
    backgroundColor: '#CAEAF2',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    color: "#065C71",
    fontWeight: "bold",
    textAlign: "center"
  },
  note: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: 20,
    marginTop: 5,
    borderRadius: 10,
    textAlign: "auto",
    fontSize:22,
  },
  noteTitle: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: 20,
    marginBottom: 5,
    borderRadius: 10,
    textAlign: "auto",
    fontSize:22
  },
  listNotes: {
    margin: 20,
    marginTop: 1,
    marginBottom: 5,
    borderColor: "#FFF",
    borderWidth: 1,
    padding: 10
  },
  noteText: {
    fontSize: 20
  }
});
