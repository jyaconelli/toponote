import React, { useState } from 'react'

import { View, Picker } from 'react-native'
import { Input, Button, Text, Divider } from 'react-native-elements'

import get from 'lodash.get'

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = '54d6da53-aaac-41ef-a825-8f8814105c9c-92fc9ff8-ae44-415b-af02-4e797aac9428'
axios.defaults.headers.post['Content-Type'] = 'application/json'

import { v4 as uuidv4 } from 'uuid'

export const AddFence = ({
  addFence,
  editFence,
  removeFence,
  onFinish,
  currentFence,
  location,
  userId
}) => {
  
  const [placeName, setPlaceName] = useState(currentFence ? currentFence.description : '')
  const [placeRadius, setPlaceRadius] = useState(get(currentFence, 'radius', 50))

  return (
    <View style={{backgroundColor: '#FFF'}}>
      <Text h4 style={{marginTop: 100, paddingLeft: 50, fontFamily: 'Times New Roman', paddingRight: 50, color: '#000000aa', textAlign: 'center'}}>Hmm.. I don't recognize this place. Want to add it?</Text>
      <Input
        placeholder="Place Name"
        containerStyle={{marginTop: 50}}
        value={placeName}
        onChangeText={text => setPlaceName(text)}
      />

        <Picker selectedValue={placeRadius} onValueChange={value => setPlaceRadius(value)} style={{marginTop: -40}}>
        <Picker.Item value={50} label="Small (i.e. house)" />
        <Picker.Item value={150} label="Medium (i.e. office complex)" />
        <Picker.Item value={250} label="Large (i.e. football stadium)" />
        <Picker.Item value={750} label="Huge (i.e. college campus)" />
      </Picker>
      <Button
        title="Add Place"
        containerStyle={{backgroundColor: '#34C759'}}
        buttonStyle={{backgroundColor: '#FFFFFF00'}}
        onPress={() => {

          const data = {
            description: placeName,
            externalId: !!currentFence ? currentFence.externalId : uuidv4(),
            type: 'circle',
            coordinates: [get(location, 'location.longitude', null), get(location, 'location.latitude', null)],
            radius: placeRadius,
            tag: userId
          }

          // TODO: make tag userId
          var url = !currentFence ? 'https://toponote.herokuapp.com/addFence' : `https://toponote.herokuapp.com/updateFence`
          if (!currentFence) {
            axios.post(url, { data: data })
            .then((res) => {
              addFence(data)
              onFinish()
            })
            .catch((err) => console.log('ADD ERR: ', err))
          } else {
            axios.put(url, { data: data })
            .then((res) => {
              editFence(data)
              onFinish()
            })
            .catch((err) => console.log('EDIT ERR: ', err))
          }
          
          
        }}
      />

      <Divider />
      {currentFence && (<Button type="clear"
        title="Delete Place"
        onPress={() => {
          removeFence(currentFence.externalId)
          onFinish()
        }}
      />)}
    </View>
  )
}