import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react'
import CButton from './components/CButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import noteDetails from './screens/noteDetails';
import Home from './screens/Home';
import createNote from './screens/createNote';
import viewNotes from './screens/viewNotes';

import updateNote from './screens/updateNote';
function App() {



  const Stack = createNativeStackNavigator();
  return (  
    // <NotesProvider>
    <NavigationContainer >
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen  name="noteDetails" component={noteDetails} />
      <Stack.Screen  name="createNote" component={createNote} />
      <Stack.Screen  name="Notes" component={viewNotes} />
      <Stack.Screen  name="Update Note" component={updateNote} />
  

        </Stack.Navigator>
    </NavigationContainer >
    // </NotesProvider>
   
  );
}

export default App;


