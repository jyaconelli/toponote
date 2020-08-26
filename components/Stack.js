import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import NotesListContainer from './notesList/NotesListContainer'
import NoteContainer from './note/NoteContainer'
import NoteEditorContainer from './noteEditor/NoteEditorContainer'
import { v4 as uuidv4 } from 'uuid'
import Radar from 'react-native-radar'

const Stack = createStackNavigator()

const headerOptions = {
  headerStyle: {
    backgroundColor: '#34C759'
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: '700',
    fontFamily: 'Times New Roman',
    fontSize: 25
  },
}

export const ScreenStack = ({
  userId,
  setUserId
}) => {
  
  if (!userId) {
    const id = uuidv4()
    Radar.setUserId(id)
    setUserId(id)
  }

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NotesListContainer}
          options={{title: 'Notes'}}
        />
        <Stack.Screen name="Note" component={NoteContainer} />
        <Stack.Screen name="Edit" component={NoteEditorContainer} />

      </Stack.Navigator>
  )
}