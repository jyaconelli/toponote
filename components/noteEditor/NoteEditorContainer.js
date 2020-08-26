import { connect } from 'react-redux'
import { getNotes } from '../../modules/notes/selectors'
import { addNote, editNote, removeNote } from '../../modules/notes'
import { NoteEditor } from './NoteEditor'

const mapStateToProps = (state) => ({
  geofences: state.geofences.geofences
})

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note)),
  editNote: (note) => dispatch(editNote(note)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)