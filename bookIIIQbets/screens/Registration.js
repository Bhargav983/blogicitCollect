import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'

// const baseUrl = 'https://sheetdb.io/api/v1/cco56p4nvq8in';
const baseUrl = 'http://117.220.197.82:80/save-mobile/';
export default function Registration({ navigation }) {

  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  // const [bank, setBank] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [loginStatus,setLoginStatus]=React.useState(0);
  const [postStatus,setPostStatus]=React.useState(0);

  
const checkReg=()=>{
  setEmail("")
  setPassword("")
navigation.navigate('LoginScreen1')
}


const onSubmitFormHandler = async (event) => {
  // if (!fullName.trim() || !email.trim()) {
  //   alert("Name or Email is invalid");
  //   return;
  // }
  // setIsLoading(true);
  try {
    const response = await axios.post(`${baseUrl}`, {
      firstname,lastname,
      email,mobile,password
    });
    if (response.status === 201) {
      alert(` You have created: ${JSON.stringify(response.data)}`);
      // setIsLoading(false);
      setFirstName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setLastName('');
      setUserName('');

    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    alert("An error has occurred");
    setIsLoading(false);
  }
};

const submitForm =() => {

  console.log("..Submitting the Form ")
if(password===confirmPassword){

  fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'first_name': firstname,
      'last_name': lastname,
      'username': username,
      'email':email,
      'mobile':mobile,
      'Password':password,
    })
  })
  // Converting to JSON
  .then(response => response.json())
   
  // Displaying results to console
  .then(json => setPostStatus(json.created));
  
  alert('Registered Successfully');
  setTimeout(() => {
    
  navigation.navigate('LoginScreen1');
    
  }, 2000);
  
  

}
else
{
  alert("Password missmatch")
}

}





  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
          <View style={styles.logoBox}>
              <Icon
                color='#fff'
                name='user'
                size={50}
              />
              </View>
            <Text style={styles.loginTitleText}> Register Here</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Name</Text> */}
              <TextInput
                style={styles.input}
                value={firstname}
                onChangeText={setFirstName}
                placeholder="first name"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Name</Text> */}
              <TextInput
                style={styles.input}
                value={lastname}
                onChangeText={setLastName}
                placeholder="last name"
              />
            </View>

            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Name</Text> */}
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUserName}
                placeholder="user name"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Email</Text> */}
              <TextInput
                style={styles.input}
                value={email}
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={setEmail}
                placeholder="Email"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Phone</Text> */}
              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile"
              />
            </View>

            

            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Password</Text> */}
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={setPassword}
                placeholder="Password"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Confirm Password</Text> */}
              <TextInput
                style={styles.input}
                value={confirmPassword}
                secureTextEntry={true}
                textContentType='confirmPassword'
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={()=>submitForm()}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row',    justifyContent: 'space-between'}}>
            <Text style={{fontSize:20,color:'black'}}>Already Registered? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen1')}>
              <Text style={{fontSize:20,color:'black',    textDecorationLine: 'underline',}}>Login</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    top: '10%',
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
  loginTitleText: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 20,
    color:'black',
    textAlign:'center'
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
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
    borderRadius: 10,
    paddingHorizontal: 10,
    color:'black',
    fontWeight:'500',
    fontSize:15
  },
  loginButton: {
    backgroundColor: '#3AB0FF',
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
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color:'black',
    fontWeight:'400'
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    color:'black',
    fontWeight:'400'
  },
});