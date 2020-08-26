import { connect } from 'react-redux'
import { getNotes } from '../../modules/notes/selectors'
import { getGeofences } from '../../modules/geofences/selectors'
import get from 'lodash.get'
import { Note } from './Note'

const mapStateToProps = (state, props) => {
  const notes = getNotes(state)
  const note = notes.find(({id}) => id === get(props, 'route.params.id', null))
  const geofence = getGeofences(state).find(({externalId}) => externalId === get(note, 'geofence'))
  return {
    title: get(note, 'title'),
    text: get(note, 'text'),
    geofence: geofence
  }
}

export default connect(
  mapStateToProps
)(Note)