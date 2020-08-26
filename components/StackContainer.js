import { connect } from 'react-redux'
import { getUserId } from '../modules/user/selectors'
import { setUserId } from '../modules/user'
import { ScreenStack } from './Stack'

const mapStateToProps = (state) => ({
  userId: getUserId(state)
})

const mapDispatchToProps = (dispatch) => ({
  setUserId: (id) => dispatch(setUserId(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenStack)