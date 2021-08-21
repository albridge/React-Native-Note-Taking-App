import React from 'react'
import { View, Text, ScrollView, StyleSheet,Alert } from 'react-native'
import CButton from '../components/CButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';




const noteDetails = ({navigation,route}) => {
    // const [notes, setNotes] = useState([])

    let item = route.params.sNote    
    const Delete = () =>{
        Alert.alert(
            'Confirm Delete',
            'Delete Note?',
            [
              {text: 'Cancel', onPress: () => {}},
             
              {text: 'OK', onPress: () => storeData(item) },
            ],
            {cancelable: true},
          )
         
        
    }

    const storeData = async (item) => {
        try {
          const jsonValue = await AsyncStorage.getItem('myNotes')
          let prev = jsonValue != null ? JSON.parse(jsonValue) : [];
            let filtered=[];
          filtered=prev.filter((p)=>
             p.id!=item.id
          )
        //   console.log(kite)
          const jsonValue2 = JSON.stringify(filtered)
            await AsyncStorage.setItem('myNotes', jsonValue2)
            // setNotes(kite)
            navigation.navigate('Notes')    
  
    
        } catch (e) {
          console.log('could not save to storage', e)
        }
      }
      const Update = () =>{      

          navigation.navigate('Update Note',{note:item})
      }

      function noteDate(date)
        {
            const mSec = date;
            const dObj = new Date(mSec);
            return dObj.toLocaleString()
        }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.holder}>
                <Text style={styles.time}>{noteDate(item.createdAt)}</Text>
            <Text style={styles.titleStyle}>{item.title}</Text>
            <Text style={styles.noteStyle}>{item.note}</Text>
            </View>
            <CButton title="Update" onPress={Update} />
            <CButton title="Delete" onPress={Delete} />

            
        </ScrollView>
    )
}

export default noteDetails

const styles = StyleSheet.create({
    container: {
    //   margin:20,
      flex: 1,
      backgroundColor: '#CAEAF2',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    titleStyle:{
        fontWeight:'bold',
        fontSize:22,
        marginTop:10
    },
    noteStyle:{
        fontSize:22,
        marginTop:10
    },
    holder:{
        padding:20
    },
    time:{
        fontStyle:"italic",
        // fontWeight:"bold",
        textAlign:"right",
        color:"#103C80"
    }
    
  });
