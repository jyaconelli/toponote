import React, { useRef, useLayoutEffect, useEffect } from 'react'

import { ScrollView, View, StyleSheet, Linking } from 'react-native'

import get from 'lodash.get'

import { Text, Divider, Icon} from 'react-native-elements'
import { RichEditor } from 'react-native-pell-rich-editor'


export const Note = (props) => {
  const { navigation, title, text, geofence } = props
  const { id } = get(props, 'route.params', props)
  const editorRef = useRef()

  useLayoutEffect(() => {
    editorRef.current.setContentHTML(text)
  }, [text])

  const rightComponent = (
    <Icon
      type="font-awesome-5"
      name={"edit"}
      color="white"
      size={25}
      style={{marginRight: 10}}
      onPress={() => {
        navigation.navigate('Edit', {
          geofence: geofence,
          title: title,
          text: text,
          id: id
        })
      }}
      />)
  
  const leftComponent = (
    <Icon
      type="font-awesome-5"
      name="arrow-left"
      color="white"
      size={25}
      style={{marginLeft: 10}}
      onPress={() => {
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
      title: `${title} – ${get(geofence, 'description', 'Unknown' )}`
    })
  })

  return (
    <View style={{height: '100%', backgroundColor: '#FFFFFF'}}>
      <Text style={{fontSize: 30, fontFamily: "Times New Roman", fontWeight: '600', margin: 10}}>{title}</Text>
      <Divider />
      <RichEditor
        ref={editorRef}
        useContainer
        style={{flex: 1}}
        placeholder="Your thoughts..."
        initialContentHTML={text}
        disabled
        scrollEnabled
        onShouldStartLoadWithRequest={({url, navigationType, mainDocumentURL, ...rest}) => {
          const shouldStart = url === 'about:blank' && mainDocumentURL === 'about:blank' && navigationType === 'other'
          if (shouldStart) {
            return shouldStart
          } else {
            Linking.openURL(url)
            editorRef.current.setContentHTML(text)
          }}}
      />
    </View>
  )
}