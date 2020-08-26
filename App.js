import 'react-native-gesture-handler'
import React from 'react'
import { configureStore } from './configureStore'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'

import ScreenStackContainer from './components/StackContainer'
import Radar from 'react-native-radar'
import { v4 as uuidv4 } from 'uuid'

const { store, persistor } = configureStore()

const App = () => {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <NavigationContainer>

          <ScreenStackContainer />
          </NavigationContainer>

        </PersistGate>
      </Provider>
  )
}

export default App;
