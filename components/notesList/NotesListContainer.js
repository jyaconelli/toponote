import { connect } from 'react-redux'
import { getNotes } from '../../modules/notes/selectors'
import { addNote, editNote, removeNote } from '../../modules/notes'
import { addFence, editFence, removeFence } from '../../modules/geofences'
import { getUserId } from '../../modules/user/selectors'
import { NotesList } from './NotesList'

const mapStateToProps = (state) => ({
  notes: getNotes(state),
  geofences: state.geofences.geofences,
  userId: getUserId(state)
})

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note)),
  editNote: (note) => dispatch(editNote(note)),
  removeNote: (id) => dispatch(removeNote(id)),
  addFence: (fence) => dispatch(addFence(fence)),
  editFence: (fence) => dispatch(editFence(fence)),
  removeFence: (fence) => dispatch(removeFence(fence))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesList)