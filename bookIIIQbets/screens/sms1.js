import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,Dimensions,Keyboard,Alert
} from 'react-native';
 
import SendSMS from 'react-native-sms';
 
const Sms = ({navigation,route}) => {
  const {firstName,Name,AccountNo,AccountType,Recieved,PresentBalance,Phone,agentUserName}=route.params;
  const [mobileNumber, setMobileNumber] = useState(Phone);
  const msg="Dear "+Name+", your Account type: "+AccountType+",A/C No:"+AccountNo+" Credited Rs:"+Recieved+" Successfully. Your Present Balance is Rs: "+PresentBalance
  +". Thank you "+firstName
  const [bodySMS, setBodySMS] = useState(msg);
useEffect(() => {
  setBodySMS(msg);
}) 
  const goHome=()=>{
    setMobileNumber('');
    navigation.navigate('Home',{firstName:firstName.toString(),agentUserName:agentUserName.toString()});
    }
   
    const goCollect=()=>{
      setMobileNumber('');
     navigation.navigate('Collect',{firstName:firstName.toString(),agentUserName:agentUserName.toString()});
    }
const gotoCollect=()=>{
  Alert.alert(
    "Do you want to go to Collection Screen?",
    "Did you send SMS?",
    [
      {"text":"Yes", onPress: () =>goCollect()},
      {"text":"No", onPress: () =>console.log("Pressed No")},
    ]
  )
}

const gotoHome=()=>{
  Alert.alert(
    "Do you want to go to Home Screen?",
    "Did you send SMS?",
    [
      {"text":"Yes", onPress: () =>goHome()},
      {"text":"No", onPress: () =>console.log("Pressed No")},
    ]
  )
}



  const initiateSMS = () => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      alert('Please insert correct contact number');
      return;
    
    
    }
 
    SendSMS.send(
      {
        body: bodySMS,
        // Recipients Number
        recipients: [mobileNumber],
        // An array of types 
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  };
 
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
      <View >
        <Text style={styles.titleText}>
          Sending  SMS  
        </Text>
        <View style={styles.hr}></View>

        <View style={styles.inputBox}> 
        <Text style={styles.inputLabel}>Enter Mobile Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={
            (mobileNumber) => setMobileNumber(mobileNumber)
          }
          placeholder={'Enter Conatct Number'}
          keyboardType="numeric"
          style={styles.input}
        />
        </View>
            
        
        <View style={styles.inputBox}> 
            
        <Text style={styles.inputLabel}>SMS Details</Text>
        <TextInput
          value={bodySMS}
          onChangeText={(bodySMS) => setBodySMS(bodySMS)}
          placeholder={'Enter SMS body'}
          style={styles.Bodyinput}
          multiline={true}
          editable={false}
          numberOfLines={5}
        />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.loginButton}
          onPress={initiateSMS}>
          <Text style={styles.loginButtonText}>
            Send Message
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.addButton} onPress={()=>gotoHome()}>
              <Text style={styles.addButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={()=>gotoCollect()}>
              <Text style={styles.addButtonText}>Collect</Text>
            </TouchableOpacity>
            </View>
      </View>
    
          
          </View>
          </View>
          </View>
          
    </TouchableWithoutFeedback>
  );
};
 
export default Sms;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#3AB0FF',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#FF06B7',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '5%',
  },hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  authBox: {
    width: '80%',
    backgroundColor: '#DAEAF1',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor:'red',
    borderWidth:2
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FF06B7',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  
  titleText: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 20,
    color:'black',
    textAlign:'center'
  },
 
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight:'600',
    color:'black',
    marginTop:6
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F2D1D1',
    borderRadius: 4,
    paddingHorizontal: 10,
    color:'black',
    fontWeight:'500',
    fontSize:15
  },
  Bodyinput:{
    width: '100%',
    height: 200,
    backgroundColor: '#F2D1D1',
    borderRadius: 4,
    paddingHorizontal: 10,
    color:'black',
    fontWeight:'500',
    fontSize:15
  },
  loginButton: {
    backgroundColor: '#FF06B7',
    marginTop: 35,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom:30
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton:{
    backgroundColor: '#3AB0FF',
    margin: 10,
    padding:5 ,
    borderRadius: 4,
  },
  addButtonText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
