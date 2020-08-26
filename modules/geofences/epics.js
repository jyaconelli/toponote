import { combineEpics, ActionObservable, ofType, mapTo } from 'redux-observable'
import { Types } from './actionTypes'

const pingEpic = action$ => action$.pipe(
  ofType(Types.addFence),
  mapTo({type: Types.removeFence})
)

const epic = combineEpics({
  pingEpic
})

export default epic