import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,AsyncStorage,Alert, NativeModules
} from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import { diff } from 'react-native-reanimated';
import {styles} from '../Styles/loginStyles';
// import NetInfo from "@react-native-community/netinfo";

// import { AsyncStorage } from '@react-native-async-storage/async-storage';

export default function LoginScreen1({ navigation }) {
    // const netInfo = useNetInfo();
  const [firstName,setfirstName]=React.useState("");
 const [username,setUserName]=React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginStatus,setLoginStatus]=React.useState("");
  const [isLogin, setIsLogin] = React.useState("false");
  const [name,setName]=React.useState("");
  const [agentUserName,setAgentName]=React.useState("");
  let key='key',em='em',pw='pw',nm='nm',agn='agn',fn='fn';
  let value='true';

 useEffect(()=>{Hello()});
  
 const checkLogin = async () =>{
  try {
    let response = await fetch(
      'http://117.220.197.82:80/user-detail/'+username
    );
    let json = await response.json();
    
     console.log(json);

    if(password===json[0]['password'])
    {
       console.log('firstName=',json[0].first_name)
      try {
        await AsyncStorage.setItem(fn, (json[0].first_name))

        // console.log('firstName successfully saved')
      } catch (e) {
        console.log('Failed to save the firstName to the storage')
      }
            try {
        await AsyncStorage.setItem(nm, (username))

         console.log('UserName successfully saved')
      } catch (e) {
        console.log('Failed to save the Username to the storage')
      }
      

      try {
        await AsyncStorage.setItem(pw, (password))

        // console.log('Password successfully saved')
      } catch (e) {
        console.log('Failed to save the Password to the storage')
      }
  
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
  
        // console.log('isLogin successfully saved')
      } catch (e) {
        console.log('Failed to save the data to the storage')
      }
      
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setIsLogin(value.toString());
          setLoginStatus(value.toString());

          console.log(value,email);
        }
      } catch (e) {
        alert('Failed to fetch the IsLogin from storage');
      }
      console.log('agent username=',username,json[0].username)

      navigation.navigate('Home',{firstName:json[0].first_name.toString(),agentUserName:username.toString()});

   
    }
    else{
      alert('Wrong Credentials')
    }    
  }
    catch (e) {
     alert('Please contact technical team ')
    }
      
 }

  const Hello=async()=>{
  //   NetInfo.fetch().then(state => {
  //     console.log("Connection type", state.type);
  //     console.log("Is connected?", state.isConnected);
  //     if(!state.isConnected)
  //     {
  //       alert('Please check your wifi/Mobile Data Connection');
        
  //     }
  // })
    console.log("In Autologin Hello function")
    
    
    try {
      const pwd = await AsyncStorage.getItem(pw);
      if (pwd !== null) {
        
        setPassword(pwd.toString())
        // console.log(password);
      }
    } catch (e) {
      console.log('Failed to fetch the Password from storage');
    }

    try {
      const fnm = await AsyncStorage.getItem(fn);
      if (fnm !== null) {
        
        setfirstName(fnm)
        // console.log("name=",firstName);

      }
    } catch (e) {
      console.log('Failed to fetch the Name from storage');
    }

    try {
      const eml = await AsyncStorage.getItem(em);
      if (eml !== null) {
        
        setEmail(eml.toString())
        console.log(email);
      }
    } catch (e) {
      alert('Failed to fetch the email from storage');
    }
    try {
      const naam = await AsyncStorage.getItem(nm);
      if (naam !== null) {
        setUserName(naam);
        console.log("name=",naam);
      }
    } catch (e) {
      alert('Failed to fetch the name from storage');
    }
    
            
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setIsLogin(value.toString());
        setLoginStatus(value.toString());

        console.log(value,email);
      }
    } catch (e) {
      alert('Failed to fetch the IsLogin from storage');
    }
    }
  const logout=()=>{
    Alert.alert(
      "Are you sure?",
      "Do you want to Logout?",
      [
        {"text":"Yes", onPress: () =>removeItemValue()},
        {"text":"No", onPress: () =>console.log("Pressed No")},
      ]
    )
  }
  const  removeItemValue=async()=>{
    // console.log("Starting Logout...");
    try {
        await AsyncStorage.removeItem(key);
        setIsLogin('false');
        console.log("remving isLogin");
    }
    catch(exception) {
    }
    try {
      await AsyncStorage.removeItem(nm);
      setName('');
      console.log("remving name");
  }
  catch(exception) {
  }
  try {
    await AsyncStorage.removeItem(em);
    setEmail('')
    console.log("remving email");
}
catch(exception) {
}
try {
  await AsyncStorage.removeItem(pw);
  setPassword('')
}
catch(exception) {
}
navigation.navigate('LoginScreen1');
}
    const sendCollect=()=>{
      console.log("In Login, agentUserName=",username);
      navigation.navigate('Home',{firstName:firstName.toString(),agentUserName:username.toString()});
      
    }

    const getRegister = () =>{
      alert("Please Call us : 9880211566")
    }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={[styles.centerizedView,isLogin===loginStatus ? {top:'5%'}:{top:'15%'}]}>
          <View style={[styles.authBox]}>
           
            <Text style={[styles.TitleText,{color:'red'}]}>BLogic IT Solutions</Text>
            <View style={styles.hr}></View>
            <View>
            {isLogin===loginStatus ? 
            <View>
               <Image source={require('../assets/Logo1.jpg')} style={{height:250,width:250,margin:20,borderRadius:16}} /> 
            <Text style={styles.TitleText}> Welcome {firstName}</Text>

            <TouchableOpacity style={styles.PinkButton} onPress={() =>sendCollect()}>
            <Text style={styles.ButtonText}>Start</Text>
          </TouchableOpacity> 

            <TouchableOpacity style={[styles.BlueButton,{marginTop:5}]} onPress={() =>logout()}>
            <Text style={styles.ButtonText}>Log out</Text>
          </TouchableOpacity> 

          </View>:
            <View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                textContentType='UserName'
                onChangeText={setUserName}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.BlueButton} onPress={() =>checkLogin()}>
              <Text style={styles.ButtonText}>Login</Text>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row',    justifyContent: 'space-between'}}>
            <Text style={{fontSize:12,color:'black'}}>New user ? </Text>
            <TouchableOpacity onPress={()=>getRegister()}>
              <Text style={{fontSize:15,color:'black',    textDecorationLine: 'underline',}}>Register</Text>
            </TouchableOpacity>
            </View>
            </View>}</View>
          
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

