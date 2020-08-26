import { Types } from './actionTypes'

export const addFence = (fence) => ({
  type: Types.addFence,
  payload: fence
})

export const editFence = (fence) => ({
  type: Types.editFence,
  payload: fence
})

export const removeFence = (id) => ({
  type: Types.removeFence,
  payload: id
})