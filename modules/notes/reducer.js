import { Types } from './actionTypes'
import { combineReducers } from 'redux'
import initialState from '../../initialState'


const notes = (state = initialState.notes, action) => {
  let newState = [...state]
  switch (action.type) {
    case Types.addNote:
      let newNote = action.payload
      return [...state, newNote]
    case Types.editNote:
      let modifiedNote = action.payload
      newState = [...state]
      let modifiedNoteIdx = newState.findIndex(({id}) => id === modifiedNote.id)
      newState[modifiedNoteIdx] = modifiedNote
      return newState
    case Types.removeNote:
      let idToRemove = action.payload
      newState = state.filter(({id}) => id !== idToRemove)
      return newState
      
    default:
      return state

  }
}

const index = combineReducers({
  notes
})

export default index