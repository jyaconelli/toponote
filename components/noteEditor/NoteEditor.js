import React, { useState, useLayoutEffect, useRef } from 'react'

import {
  Picker,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
  Text
} from 'react-native'
import get from 'lodash.get'
import { Button, Input, Icon, Divider, Overlay } from 'react-native-elements'

import { RichEditor, RichToolbar, defaultActions } from 'react-native-pell-rich-editor'

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { AddLinkModal } from './AddLinkModal'


import GestureRecognizer from 'react-native-swipe-gestures'
import ImagePicker from 'react-native-image-picker'

export const NoteEditor = ({
  geofences = [],
  addNote,
  editNote,
  navigation,
  route
}) => {

  const { title, text, geofence, id } = get(route, 'params', {title: '', text: ''})

  const [editNoteTitle, setEditNoteTitle] = useState(title)
  const [editNoteText, setEditNoteText] = useState(text)
  const [fencePickerValue, setFencePickerValue] = useState(get(geofence, 'externalId', null) || get(geofences, '[0].externalId', ''))

  const editorRef = useRef(null)

  const leftComponent = (
    <Icon
      type="font-awesome-5"
      name="arrow-left"
      color={"#FFFFFF"}
      size={25}
      style={{marginLeft: 10}}
      onPress={() => {
        navigation.goBack()
      }}
    />
  )


  const rightComponent = (
    <Icon
      type="font-awesome-5"
      name="save"
      color="white"
      size={25}
      style={{marginRight: 10}}
      onPress={() => {
        let newNote = {
          geofence: fencePickerValue,
          title: editNoteTitle,
          text: editNoteText,
          id: id || `${editNoteTitle.split(' ').join('_')}-${Date.now()}-${fencePickerValue.split(' ').join('_')}`
        }
        if (id) {
          editNote(newNote)
        } else {
          addNote(newNote)
        }
        navigation.goBack()
      }}
    />)

      

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => leftComponent,
      headerRight: () => rightComponent,
      headerStyle: {
        backgroundColor: '#34C759'
      },
      headerTintColor: '#FFFFFF',
      title: `${editNoteTitle || 'New Note'} – ${get(geofences.find(fence => fence.externalId === fencePickerValue), 'description')}`
    })
  })

  const onSwipeDown = () => {
    editorRef.current.blurContentEditor()
    Keyboard.dismiss()
  }
  
  const [linkModalVisible, setLinkModalVisible] = useState(false)
  const onAddLink = () => setLinkModalVisible(true)
  const onAddLinkDone = (linkText, linkUrl) => {
    editorRef.current.insertLink(linkText, linkUrl)
    setLinkModalVisible(false)
  } 

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.showImagePicker(options, (response) => {  
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = { uri: response.uri }
        editorRef.current.insertImage(`data:image/jpeg;base64;base64,${response.data}`)
        editorRef.current.blurContentEditor()

      }
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'flex-end'}}>
        <AddLinkModal editorRef={editorRef}  visible={linkModalVisible} onDone={onAddLinkDone} onCancel={() => setLinkModalVisible(false)} />
        <View style={{flex: 1}}>
          <Input
            editable
            numberOfLines={1}
            value={editNoteTitle}
            onChangeText={text => setEditNoteTitle(text)}
            placeholder="Title"
            inputStyle={{fontSize: 25, fontWeight: '600'}}
            placeholderTextColor="#00000066"
          />

<KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{justifyContent: 'flex-end'}}
  >
          <View style={{height: 300}}
            contentContainerStyle={{justifyContent: 'flex-end'}}
          >
            <RichEditor
              useContainer={false}
              ref={editorRef}
              onMagicTap={Keyboard.dismiss}
              placeholder="Your thoughts..."
              onChange={e => {
                setEditNoteText(e)
              }}
              initialContentHTML={editNoteText}
              style={{minHeight: 300}}
              scrollEnabled
            />
          </View>
          </KeyboardAvoidingView>
          <Divider />
          <Picker
            selectedValue={fencePickerValue}
            onValueChange={(itemValue, itemIndex) => setFencePickerValue(itemValue)}
          >
            {geofences.map(fence => (
              <Picker.Item label={fence.description} value={fence.externalId} key={fence.externalId} />
            ))}
          </Picker>
        </View>
        <KeyboardAccessoryView avoidKeyboard>
        <GestureRecognizer onSwipeDown={onSwipeDown}>
          <View>
            <RichToolbar
              getEditor={() => {
                return editorRef.current
              }}
              onInsertLink={onAddLink}
              selectedButtonStyle={{backgroundColor: '#34C759'}}
              actions={[...defaultActions,
                'dismissKeyboard'
              ]}
              iconMap={{
                image: () => <Icon name="image" type="font-awesome-5" />,
                bold: () => <Icon name="bold" type="font-awesome-5" />,
                italic: () => <Icon name="italic" type="font-awesome-5" />,
                unorderedList: () => <Icon name="list-ul" type="font-awesome-5" />,
                orderedList: () => <Icon name="list-ol" type="font-awesome-5" />,
                link: () => <Icon name="link" type="font-awesome-5" />,
                dismissKeyboard: () => <Icon name="check" type="font-awesome-5" />,
              }}
              onPressAddImage={() => chooseImage()}
              dismissKeyboard={onSwipeDown}
                
            />
            
          </View>
        </GestureRecognizer>
      </KeyboardAccessoryView>

    </View>


  )
}