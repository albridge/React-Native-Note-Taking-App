import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import CButton from '../components/CButton'
import AsyncStorage from '@react-native-async-storage/async-storage';


const viewNotes = ({navigation}) => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getData();
      }, [notes])
 

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('myNotes')
          let data = jsonValue !== null ? JSON.parse(jsonValue) : null;
          if (data !== null) {
            setNotes(data);
            
          }
        } catch (e) {
    
        }
      }



    const viewStore = () => {
        const getData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('myNotes')      
            jsonValue != null ? JSON.parse(jsonValue) : null;
            // console.log("storage contains", jsonValue)
            let prev = JSON.parse(jsonValue)
    
          } catch (e) {
            console.log("cant read from async storage",e)
          }
        }
        getData();
      }


    
    
      const deleteAllItems = async () => {
        try {
          await AsyncStorage.removeItem('myNotes');
          setNotes([]);
        } catch (err) {
          console.log(err);
        }
      };
    
    
      const noteDetails = (note) =>{
        navigation.navigate('noteDetails',{sNote:note,allNotes:notes})
      }

      function noteDate(date)
        {
            const mSec = date;
            const dObj = new Date(mSec);
            return dObj.toLocaleString()
        }

        function hours(date)
        {
            const mSec = date;
            const dObj = new Date(mSec);
            return dObj.getHours()
        }


    return (
        <ScrollView style={styles.container}>
                 {
        <View style={{marginTop:20}}>
          {notes !== null && notes.reverse().map((note) =>
          <TouchableOpacity key={note.id} onPress={()=>noteDetails(note)} >
            <View  style={styles.listNotes}>
              <Text style={styles.noteText}>{note.title}</Text>
              <Text>{noteDate(note.createdAt)}</Text>
              
            </View>
            </TouchableOpacity>

          )}
        </View>
      }

{/* <CButton title="View Storage" onPress={viewStore} />

<CButton title="Clear Storage" onPress={deleteAllItems} />   */}
            
        </ScrollView>
    )
}

export default viewNotes

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
      textAlign: "auto"
    },
    noteTitle: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#fff",
      margin: 20,
      marginBottom: 5,
      borderRadius: 10,
      textAlign: "auto"
    },
    listNotes: {
      margin: 20,
      marginTop: 1,
      marginBottom: 5,
      marginLeft:0,
      marginRight:0,
      borderBottomColor: "#FFF",
      borderBottomWidth: 1,
      padding: 10,
    //   backgroundColor:"#13A8CD",
    //   borderRadius:8
    },
    noteText: {
      fontSize: 22
    }
  });
  
