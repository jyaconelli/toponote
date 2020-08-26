import { Types } from './actionTypes'
import { combineReducers } from 'redux'
import initialState from '../../initialState'


const userId = (state = initialState.userId, action) => {
  switch (action.type) {
    case Types.setUserId:
      let id = action.payload
      return id
    default:
      return state
  }
}

const index = combineReducers({
  userId
})

export default index