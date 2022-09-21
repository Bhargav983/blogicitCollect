import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {styles} from '../Styles/loginStyles';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';




const Home = ({ navigation,route }) => {
    
    const {firstName,agentUserName}=route.params;

    // useEffect(() => {
    //   if (navigation.isFocused()) {
    //     checkWifi(); // replace with your function
    //   }
    // }, [navigation.isFocused()]);

    
    // useFocusEffect(
    //   React.useCallback(() => {
    //     checkWifi()
    //     return () => {
       
    //     };
    //   }, [])
    // );
  
    const checkWifi=()=>{
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if(!state.isConnected)
        {
          alert('Please check your wifi/Mobile Data Connection');
        }
    });
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={[styles.centerizedView,{top:'5%'}]}>
          <View style={[styles.authBox,{ width: '90%',}]}>
            <Image source={require('../assets/Logo.jpg')} style={{height:250,width:280,margin:20,borderRadius:16}} /> 
           <View>
            <Text style={styles.TitleText}>{"Welcome "}{firstName}</Text>
           </View>
            <TouchableOpacity onPress={() => navigation.navigate('Collect',
            {firstName:firstName.toString(),agentUserName:agentUserName.toString()})} style={styles.PinkButton}>
          <Text style={styles.ButtonText}>  COLLECT </Text>
            </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Report',{firstName:firstName,username:agentUserName.toString()})} style={[styles.BlueButton,{marginTop:5}]}>
          <Text style={styles.ButtonText}>  REPORTS </Text>
        </TouchableOpacity>
{/* 
        <TouchableOpacity onPress={() => {}} style={styles.BlueButton}>
          <Text style={styles.ButtonText}>  SETTINGS </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.PinkButton}>
          <Text style={styles.ButtonText}>  IMPORT & EXPORT </Text>
        </TouchableOpacity>
        
         */}
          </View>
          </View>
            
    </View>
    )

}
  

export default Home

// const styles =  StyleSheet.create({
//     banner:{
//         backgroundColor:'#F7F5F2',
//         height:300,
//         width:1000
//     },
//     bannerContainer:{
//         justifyContent:'center',
//         alignItems:'center',
//         height:'100%',
//         width:'100%',
//         flex:1
//     },
//     buttonBlue:{
//         width:'70%',
//         backgroundColor:'#3AB0FF',
//         padding:10,
//         borderRadius:1000,
//         alignItems:'center',
//         paddingBottom:10,
//         margin:10

//     },buttonPink:{
//         width:'70%',
//         backgroundColor:'#FF06B7',
//         padding:10,
//         borderRadius:1000,
//         alignItems:'center',
//         paddingBottom:10,
//         margin:10

//     },
//     buttonText:{
//         fontSize:20,
//         fontWeight:'800',
//         color:'white'
//     },
//     welcomeText:{
//         fontSize:25,
//         fontWeight:'600',
//         color:'black',
//         margin:20,
//         fontStyle:'italic'
//     }
// })
