import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import DrawerScreen from './screens/drawer';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reportReducer from './redux/reducers/reportReducer';

const createStoreWithMiddleware=applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reportReducer);

const App = () => {
  return (
    
    <NavigationContainer>

<Provider store={store}>
      <DrawerScreen/>
      </Provider>
      </NavigationContainer>
      
    );
};

export default App;

const styles =  StyleSheet.create({
  container:{
    paddingTop:40,
    paddingHorizontal:16
  }
});
