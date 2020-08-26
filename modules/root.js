
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'


// import reduces and epics here
import notes from './notes'
import geofences, { epic } from './geofences'
import user from './user'


// list reducers
export const rootReducer = combineReducers({
  notes,
  geofences,
  user
})

// list epics
export const rootEpic = combineEpics({
  epic
})