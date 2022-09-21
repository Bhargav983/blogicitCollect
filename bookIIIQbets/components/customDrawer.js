import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        {/* <ImageBackground
          source={require('../assets/logo1.jpg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/Abhi.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10,marginLeft:80,borderColor:'yellow',borderWidth:2}}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 25,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
              fontWeight:'700',
              marginLeft:60
            }}>
            ABHIJITH 
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'yellow',
                fontFamily: 'Roboto-Regular',
                marginLeft:90
              }}>
              CEO
            </Text>
          </View>
        </ImageBackground> */}
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;