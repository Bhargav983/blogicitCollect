import React from 'react';
import { Text,AsyncStorage, View ,TouchableOpacity,StyleSheet} from 'react-native';

// import { AsyncStorage } from '@react-native-async-storage/async-storage';


const HelloWorldApp = () => {

    let STORAGE_KEY = 'userinput';

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginStatus,setLoginStatus]=React.useState(0);
  const [isLogin, setIsLogin] = React.useState('false');
    const checkLogin=async()=>{
        setTimeout(Hello,2000);
        let value='true'
        let key=''
        try {
          await AsyncStorage.setItem(key, JSON.stringify(value))
          console.log('Data successfully saved')
        } catch (e) {
          console.log('Failed to save the data to the storage')
        }
        
        try {
          const value = await AsyncStorage.getItem(key);
      
          if (value !== null) {
            setIsLogin((value));
            console.log("Login status",isLogin);
            // navigation.navigate('Home',{appUserName:data_filter[0].Name,Bank:data_filter[0].Bank});
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
    }

    const Hello=()=>{

    }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() =>checkLogin()}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
    </View>
  )
}
export default HelloWorldApp;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    } });