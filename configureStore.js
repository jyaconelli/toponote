import { createStore, applyMiddleware, compose } from 'redux'

import { rootReducer, rootEpic } from './modules/root'

import { createEpicMiddleware } from 'redux-observable'

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const epicMiddleware = createEpicMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const composeEnhancer = compose(
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//  applyMiddleware(epicMiddleware)
//)


export function configureStore() {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
    //applyMiddleware(epicMiddleware)
  )
  //epicMiddleware.run(rootEpic)
  const persistor = persistStore(store)

  return { store, persistor }
}



