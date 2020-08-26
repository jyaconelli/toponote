import { Types } from './actionTypes'
import { combineReducers } from 'redux'
import initialState from '../../initialState'


const geofences = (state = initialState.geofences, action) => {
  let newState = [...state]
  switch (action.type) {
    case Types.addFence:
      let { payload: newFence } = action
      return [...newState, newFence]
    case Types.editFence:
      let { payload: modifiedFence } = action
      let modifiedFenceIdx = newState.findIndex(({ externalId }) => externalId === modifiedFence.externalId)
      newState[modifiedFenceIdx] = modifiedFence
      return newState
    case Types.removeFence:
      let { payload: idToRemove } = action
      newState = state.filter(({ externalId }) => externalId !== idToRemove)
      return newState
    default:
      return state

  }
}

const index = combineReducers({
  geofences
})

export default index