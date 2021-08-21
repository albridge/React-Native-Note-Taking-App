import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import CButton from '../components/CButton'
import { NotesContext } from '../NotesContext';
import {useContext, useEffect, useState} from 'react'


const Home = ({navigation}) => {
    const [notes, setNotes] = useState([])

    // useEffect(() => {
    //     getData();
    //   }, [])

    const newNote = () =>{
        navigation.navigate('createNote')
    }

    const viewNotes = () =>{
        navigation.navigate('Notes')
    }

    // const getData = async () => {
    //     try {
    //       const jsonValue = await AsyncStorage.getItem('myNotes')
    //       let data = jsonValue !== null ? JSON.parse(jsonValue) : null;
    //       if (data !== null) {
    //         setNotes(data);
    //       }
    //     } catch (e) {
    
    //     }
    //   }


    return (
        <View style={styles.container}>



<View style={styles.top}>
    <Text style={styles.title}>BlueNotes</Text>
    <Image style={styles.logo} source={require('../assets/icons/note1.png')} />
    
</View>
        <CButton title="Create Note" onPress={newNote} />

        <CButton title="View Notes" onPress={viewNotes} />
            
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      // marginTop:50,
      flex: 1,
      backgroundColor: '#CAEAF2',
    //   alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
        width:100,
        height:110,
   
             
    },
    title: {
        marginTop: 50,
        fontSize: 25,
        color: "#065C71",
        fontWeight: "bold",
    
      
      },
      top:{
          alignItems:"center",
          position:"absolute",
          top:50,
          alignSelf:"center",
         

      }
    
  });
