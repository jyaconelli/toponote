import React, { useState, useEffect, useLayoutEffect } from 'react'
import get from 'lodash.get'
import {
  SafeAreaView,
  FlatList,
  Image,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native'

import Radar from 'react-native-radar'

import { AddFence } from '../addFence/AddFence'
import { ListItem, Button, Text, Overlay, Icon } from 'react-native-elements'

export const NotesList = ({
  navigation,
  notes,
  geofences,
  removeNote,
  addFence,
  editFence,
  removeFence,
  userId
}) => {

  Radar.requestPermissions(false); // false means don't request background tracking

  const [location, setLocation] = useState(null)
  const [filteredFences, setFilteredFences] = useState([])
  const [isFilteringFences, setIsFilteringFences] = useState(true)
  const [shouldShowOverlay, setShouldShowOverlay] = useState(false)
  const [notesLocationTitle, setNotesLocationTitle] = useState('Unknown')
  const [isLoaded, setIsLoaded] = useState(false)
  const [refreshToggleTrigger, setRefreshToggleTrigger] = useState(false)
  const triggerRefresh = () => setRefreshToggleTrigger(r => !r)

  const getRelevantGeofences = (fences) => fences.filter(({externalId: fenceExternalId}) => geofences.map(({externalId}) => externalId).includes(fenceExternalId))

  useEffect(() => {
    setIsLoaded(false)
    Radar.trackOnce().then((result) => {
      setLocation(result)
      setFilteredFences(getRelevantGeofences(get(result, 'user.geofences', [])))
      setNotesLocationTitle(get(getRelevantGeofences(get(result, 'user.geofences', []))[0], 'description', 'Unknown'))
      setIsLoaded(true)
    }).catch((err) => {
      setIsLoaded(true)
      console.error(err)
    })
  }, [geofences, refreshToggleTrigger])

  useEffect(() => {

  }, [notes])


  const RemoveNoteIcon = ({id}) => (
    <Icon
      name="trash-alt"
      type="font-awesome-5"
      color="#00000099"
      size={25}
      onPress={() => removeNote(id)}
    />
  )

  const rightComponent = (
    <Icon
      type="font-awesome-5"
      name="plus"
      color="white"
      size={25}
      style={{marginRight: 10}}
      onPress={() => {
        navigation.navigate('Edit', { geofence: filteredFences[0] })
      }}
      />)

  const getFilterIconColor = (filtering) => {
    return !filtering ? "#FFFFFF" : "#FFFFFFAA"
  }
  const leftComponent = (
    <Icon
      type="font-awesome-5"
      name="infinity"
      color={getFilterIconColor(isFilteringFences)}
      size={25}
      style={{marginLeft: 10}}
      onPress={() => {
        setIsFilteringFences(filtering => !filtering)
      }}
    />
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => leftComponent,
      headerRight: () => rightComponent,
      headerStyle: {
        backgroundColor: '#34C759'
      },
      headerTintColor: '#FFFFFF',
      title: `Notes – ${notesLocationTitle}`
    })
  }, [notesLocationTitle, isFilteringFences, geofences])

  return (
    <>
    { isLoaded || !isFilteringFences ? (<>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={!isLoaded}
            onRefresh={triggerRefresh}
          />
        }
        data={isFilteringFences ? notes.filter(note => filteredFences.map(({externalId})=>externalId).includes(note.geofence)) : notes}
        renderItem={({item}) => <ListItem rightIcon={(<RemoveNoteIcon id={item.id} />)} title={item.title} key={item.id} bottomDivider onPress={() => {
          const { title, text, id, geofence: geofenceId } = notes.find(({id}) => id === item.id)
          const geofence = geofences.find(({ externalId }) => externalId === geofenceId)
          navigation.navigate('Note', {
            title: title,
            text: text,
            id: id,
            geofence: geofence
          })
          }} />}
        
        keyExtractor={item => item.id}
        style={{height: 725}}
        ListEmptyComponent={(<>
          <Text style={{textAlign:'center', marginTop: 100, fontSize: 16, color: '#000000aa'}}>
            {filteredFences.length > 0 ? "You don't have any notes for this location." : "You haven't saved this location yet."}
          </Text>
          <View style={{flexDirection:'row', flexWrap:'wrap', textAlign:'center', fontSize: 16, color: '#000000aa', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
          <Button type="clear" onPress={() => setIsFilteringFences(false)} title="See All Notes" />
          {filteredFences.length === 0 && (<>
            <Text style={{fontSize: 16, color: '#000000aa'}}>
              or
            </Text>
            <Button type="clear" onPress={() => setShouldShowOverlay(true)} title="Add Place" />
          </>)}
          </View>
        </>)}
      />
      <SafeAreaView>
      <Button title={ filteredFences.length > 0 ? 'Edit Place' : 'Add Place' } type="clear" onPress={() => setShouldShowOverlay(true)} />
      </SafeAreaView>
      <Overlay
        isVisible={shouldShowOverlay}
        onBackdropPress={() => setShouldShowOverlay(false)}
        animated={true}
        animationType="slide"
      >
        <AddFence
          editFence={editFence}
          addFence={addFence}
          onFinish={() => setShouldShowOverlay(false)}
          currentFence={filteredFences[0]}
          removeFence={removeFence}
          location={location}
          userId={userId}
        />
      </Overlay>
    </>
    ) : (
      <>
        <ActivityIndicator size="large" style={{marginTop: '60%'}} />
      </>
    )}
    </>
  )
}
