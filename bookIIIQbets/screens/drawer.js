import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './home';
import LoginScreen1 from './login'
import { createStackNavigator } from '@react-navigation/stack';
import Sms from './sms';

import CustomDrawer from '../components/customDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collect from './collect';
import Registration from './Registration';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
import Print from './print';
import Report from './report';
import ReadReport from './readReport';

function DrawerScreen() {
  
  return (

// options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}
    <Drawer.Navigator  
    drawerContent={props => <CustomDrawer {...props} />}
    
    screenOptions={
      {
        headerStyle: {
      backgroundColor: 'blue', //Set Header color,
     
      },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
           paddingLeft:40
          },
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
      },
    }}>
      <Drawer.Screen name="LoginScreen1" component={LoginScreen1} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Collect" component={Collect} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Registration" component={Registration} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Sms" component={Sms} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Print" component={Print} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Report" component={Report} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="ReadReport" component={ReadReport} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>     
      <Drawer.Screen name="Print1" component={Print} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/>
      {/* <Drawer.Screen name="BackButton" component={BackButton} options={{headerShown:false ,   drawerItemStyle: { display: 'none' }}}/> */}
    </Drawer.Navigator>

  );
}

export default DrawerScreen;


