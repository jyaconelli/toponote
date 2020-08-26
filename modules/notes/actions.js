import { Types } from './actionTypes'

export const addNote = (note) => ({
  type: Types.addNote,
  payload: note
})

export const editNote = (note) => ({
  type: Types.editNote,
  payload: note
})

export const removeNote = (id) => ({
  type: Types.removeNote,
  payload: id
})