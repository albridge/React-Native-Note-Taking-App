import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'

const CButton = ({title, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.button}>
           <Text style={styles.title}>{title}</Text> 
        </View>
        </TouchableWithoutFeedback>
    )
}

export default CButton

const styles=StyleSheet.create({
    button:{
        backgroundColor:"#106276",
        padding:10,
        margin:10,
        borderRadius:10,
        // zIndex:5
    },
    title:{
        color:"#fff",
        textAlign:"center",
        fontSize:18
    }
})
