import React from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import CButton from '../components/CButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import uuid from 'react-native-uuid';

const updateNote = ({navigation, route}) => {
    let item = route.params.note   

    const [note, setNote] = useState(item.note)
    // const [notes, setNotes] = useState([])
    const [noteTitle, setNoteTitle] = useState(item.title)

    const Update = () =>{
        if(note=='' || noteTitle=='')
      {
          alert('Please enter a note title and body')
          return;
      }
        doUpdate(item);
    }

    const doUpdate = async (item) => {
        try {
          const jsonValue = await AsyncStorage.getItem('myNotes')
          let prev = jsonValue != null ? JSON.parse(jsonValue) : [];
            let kite=[];
          kite=prev.filter((p)=>
             p.id!=item.id
          )
        //   console.log(kite)
        let noteId = uuid.v4();
        let updated={id:noteId,title:noteTitle,note:note, createdAt:Date.now(), isCompleted: false}
        let newNotes=[...kite,updated];
          const jsonValue2 = JSON.stringify(newNotes)
            await AsyncStorage.setItem('myNotes', jsonValue2)
            // setNotes(newNotes)
            navigation.navigate('Notes')  
     
    
        } catch (e) {
          console.log('could not save to storage', e)
        }
      }
      


    return (
        <View styles={styles.container}>
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

      <CButton title="Update Note" onPress={Update} />
            
        </View>
    )
}

export default updateNote

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
      fontSize:22
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
  
