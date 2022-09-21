import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment'
const App = () => {
  var today = moment().format('DD-MM-YYYY')
  var year=moment().format('YYYY')
  var month = moment().format('MM')
  var day = moment().format('DD')
  var a = moment([2022, 7, 10]);
  var b = moment([year, month-1, day]);
 var days=(a.diff(b, 'days')  )
 var aa=moment([2022, 7, 10]).format('DD-MMM-YYYY')
//  var new_date = moment("20.03.2014", "DD-MM-YYYY").add(5,'days');
var new_date = moment().add(30, 'days').format("DD-MM-YYYY");
  return (
    
        <View>
        <Text>{moment().format('DD-MM-YYYY')}  {days} {today} {year} {month} {day} {aa} {new_date}</Text>
        </View>
    );
};

export default App;

const styles =  StyleSheet.create({
  container:{
    paddingTop:40,
    paddingHorizontal:16
  }
});
