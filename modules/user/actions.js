import { Types } from './actionTypes'

export const setUserId = (id) => ({
  type: Types.setUserId,
  payload: id
})