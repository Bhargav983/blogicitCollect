import React,{useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,ScrollView,KeyboardAvoidingView,Alert,ActivityIndicator
} from 'react-native';
import {  useFocusEffect } from '@react-navigation/native';

import Icon  from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'

const collectionUrl2 = 'http://117.220.197.82:80/saved-detail/';  
const collectionUrl1 = 'http://117.220.197.82:80/product-detail/';
const saveRecievedUrl="http://blogicitsolutions.com/save-insert/"

export default function Collect({ navigation,route }) {
  const {firstName,agentUserName}=route.params;
  const [dir,setDir]= React.useState("");
  const [accountNo, setAccountNo] = React.useState();
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("abc --xxxx");
  const [agentName, setAgentName] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [previousBalance, setPreviousBalance] = React.useState("");
  const [openDate, setOpenDate] = React.useState("");
  const [recieved, setRecieved] = React.useState("");

  const [presentBalance, setPresentBalance] = React.useState("");

  const [isJson,setIsJson]=React.useState("true");
  const [postStatus,setPostStatus]=React.useState(0);
  const [message, setMessage] = React.useState("Hello");
  const [isView, setIsView] = React.useState("false");
  const [isSave, setIsSave] = React.useState("false");
  const [focusforprint,setFocusForPrint]=React.useState(0);
 
  useEffect(()=>{
  setIsSave("false");
  setIsView("false");
  setAccountNo("");
}
,[]
)


useEffect(()=>{
  setIsSave("false");
  setIsView("false");
  setAccountNo("");
}
,[focusforprint]
)


const clearRecieved=()=>{
        setName('');
        setAccountNo('');
        setAccountType('');
        setPreviousBalance('');
        setOpenDate('');
        setMobile('')
        setAgentName('');
        setRecieved('');
        setPresentBalance('');
        setIsSave("false");
        setIsView("false");
}
const clearAll=()=>{
Alert.alert(
  "Are you sure?",
  "Do you want to clear all fields?",
  [
    {"text":"Yes", onPress: () =>clearRecieved()},
    {"text":"No", onPress: () =>console.log("Pressed No")},
  ]
)
}
const clearExceptAccoutNo=()=>{
  setName('');
  setAccountType('');
  setPreviousBalance('');
  setOpenDate('');
  setMobile('')
  setAgentName('');
  setRecieved('');
  setPresentBalance('');
  setIsSave("false");
  setIsView("false");
}


const saveData = async () =>{
  if(recieved==="" || presentBalance==="")
{
  alert('Please enter  Recieved amount and Add it')
}
else{
  var data = {
    'AccountNo':parseInt(accountNo),
    'AccountType': accountType,
    'Name': name,
    'PreviousBalance': parseInt(previousBalance),
    'PresentBalance':parseInt(presentBalance),
    'OpenDate':openDate,
    'Today': moment().format("DD-MM-YYYY"),
    'AgentName':agentName,
    'Mobile':mobile,
    'Time':moment().format("HH:mm"),
    'Recieved':parseInt(recieved)
  };
  console.log('data to be saved=',JSON.stringify(data))
  var url = saveRecievedUrl;
  try{

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response =>  {
      response.json();
      // var str1= JSON.stringify(response.json());
      // var str2=JSON.stringify({"_U": 0, "_V": 0, "_W": null, "_X": null})
      // console.log('compare str1 and str2 =',str1===str2)
      // if(str1===str2)
      // { alert('couldnt post the Data')
      // }
      // else{
        alert('data saved successfully');
        setIsSave("true");
        setIsView("false");
      // }
   }
    )
    // .then(data => {
    //   console.log('Success:', data);
    // // alert(data);
       
    // }
      
    // )
  }
  catch(e){
    alert(e);
  }
}
 
}

  const getInitial = async() =>{
    try {

      
      let response = await fetch(
        collectionUrl1+accountNo
      );
      let json = await response.json();
      //console.log(json);
    var data_filter=[{"AccountNo": "", "AccountType": "", "Balance": "", "OpenDate": "", "Phone": "", "Status": "","AgentName":""}]
      data_filter = json.filter( element => element.AccountNo ==accountNo && element.AgentName===agentUserName)
    //  console.log('data_filter',data_filter)  
     setName(data_filter[0].Name);
     setAccountType(data_filter[0].AccountType);
     setPreviousBalance(data_filter[0].PresentBalance);
     setOpenDate(data_filter[0].OpenDate);
     setMobile(data_filter[0].Phone)
     setAgentName(data_filter[0].AgentName);
     setRecieved('');
     setPresentBalance('');

    //  console.log('AgentName=',agentName,data_filter[0].AgentName);
    } catch (error) {
       console.error(error);
    }
  }
  const getSaved = async() =>{
    try {

      //getInitial(); getSaved();
      
      let response = await fetch(
        collectionUrl1
      );
      let json = await response.json();
      //console.log(json);
    var data_filter=[{"AccountNo": "", "AccountType": "", "Balance": "", "OpenDate": "", "Phone": "", "Status": "","AgentName":""}]
      data_filter = json.filter( element => element.AccountNo ==accountNo && element.AgentName===agentUserName)
    //  console.log('data_filter',data_filter)  
     setName(data_filter[0].Name);
     setAccountType(data_filter[0].AccountType);
     setPreviousBalance(data_filter[0].PresentBalance);
     setOpenDate(data_filter[0].OpenDate);
     setMobile(data_filter[0].Phone)
     setAgentName(data_filter[0].AgentName);
     setRecieved('');
     setPresentBalance('');

    //  console.log('AgentName=',agentName,data_filter[0].AgentName);
    } catch (error) {
       console.error(error);
    }

  }
  const handleError = function (err) {
    setIsJson("true")
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
    }));
};
  const getAccountDetails = async () => {
    try {
      setIsJson("false");
      let response = await fetch(
        collectionUrl2+accountNo
      )
      let readSave = await response.json();
      console.log('readSave=',readSave)
      var len = readSave.length
      console.log('readSave=',len);
    if(readSave==="Account doesnt exist in database" || len==0 )
      { 
    try { 
      let response = await fetch(
        collectionUrl1+accountNo
      );
      console.log('response.ok=',response.ok)
      if(!response.ok)
      {
        throw Error('No Account')
      }
      let json = await response.json();
      var len2 = json.length
      console.log('length2 =',json,len2)
      if(len2==0 || len2==="undefined" )
      {
          alert("couldnt fetch data");
      }
      else{
        if( json === "Account doesnt exist in database")
      {
      
        Alert.alert(
          "No Account or Contact Support",
          "This account doesn't exist or Contact Support",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }

          ]
        )
        clearExceptAccoutNo()
      }
      else{
        
      console.log("First get = ",json['AgentName']===agentUserName)
      if(json['AgentName']===agentUserName)
      {     setIsView("true");
            setIsSave("false");

            setName(json['Name']);
          setAccountType(json['AccountType']);
          setPreviousBalance(json['PreviousBalance']);
          setOpenDate(json['OpenDate']);
          setMobile(json['Phone'])
          setAgentName(json['AgentName']);
          setRecieved('');
          setPresentBalance('');
          setIsJson("true");
         
        }
      else
      {
        alert('Account doesnt belongs to you')
        setName('');
        setAccountType('');
        setPreviousBalance('');
        setOpenDate('');
        setMobile('')
        setAgentName('');
        setRecieved('');
        setPresentBalance('');
      }
      }
      }
      
    //  console.log('AgentName=',agentName,data_filter[0].AgentName);
    } catch (error) {
       console.log('error=',error.message);
       if (error.message=="No Account")
       {
        Alert.alert(
          "No Account",
          "This account doesn't exist",
          [
            { text: "OK", onPress: () =>clearRecieved() }

          ]
        )
       }
      //  alert(error);
    }

      }
    else
       {
        var data_filter1=[{"AccountNo": "", "AccountType": "", "Balance": "", "OpenDate": "", "Phone": "", "Status": "","AgentName":""}]
        data_filter1 = readSave.filter( element => element.AccountNo ==accountNo)
      //  console.log('data_filter',data_filter)
      console.log("First get = ",data_filter1[len-1].AgentName===agentUserName)
      console.log('Name=',data_filter1[len-1]['AgentName'],agentUserName)
      if(data_filter1[len-1]['AgentName']===agentUserName)
      {    setIsView("true"); 
            setIsSave("false");

          setName(data_filter1[len-1].Name);
          setAccountType(data_filter1[len-1].AccountType);
          setPreviousBalance(data_filter1[len-1].PresentBalance);
          setOpenDate(data_filter1[len-1].OpenDate);
          setMobile(data_filter1[len-1].Phone)
          setAgentName(data_filter1[len-1].AgentName);
          setRecieved('');
          setPresentBalance('');
          setIsJson("true");
        }
       else
       {
        alert('This Account doesnt belog to you ');
        setName('');
        setAccountType('');
        setPreviousBalance('');
        setOpenDate('');
        setMobile('')
        setRecieved('');
        setPresentBalance('');
       }
    }
      

    } catch (error) {
       console.error(error.message);
       if(accountNo=="")
       alert("Please enter Account No");
       else
       {if(error.message==="JSON Parse error: Unrecognized token '<'")
            { Alert.alert(
              "Couldnt get Data",
              "Please contact support team",
              [
                // {
                //   text: "Cancel",
                //   onPress: () => console.log("Cancel Pressed"),
                //   style: "cancel"
                // },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
             );}
    }}
    Keyboard.dismiss();
  };

 const goPrint=()=>{
  if( accountNo==="" || name==="")
    {
        alert("Please enter Account No &  recieved Value")
    }
    else
    {
      setFocusForPrint(focusforprint+1);
    navigation.navigate('Print',
     { firstName:firstName.toString(),Name:name.toString(),
      AccountNo:accountNo,AccountType:accountType.toString(),
      Recieved:recieved.toString(),PresentBalance:presentBalance.toString(),
      Phone:mobile, agentUserName:agentUserName.toString()});
      // setName('')
      // setAccountType('')
      // setRecieved('')
      // setPresentBalance('')
      // setPreviousBalance('')
      // setMobile('')
      // setOpenDate('')
    }
 }

   const sendSMS=()=>{
    if(recieved==="" || accountNo==="" || name==="")
    {
        alert("Please enter Account No and recieved Value")
    }
    else
    {
      
    navigation.navigate('Sms', 
    { firstName:firstName.toString(),Name:name.toString(),
      AccountNo:accountNo,AccountType:accountType.toString(),
      Recieved:recieved.toString(),PresentBalance:presentBalance.toString(),
      Phone:mobile,agentUserName:agentUserName});
      // setName('')
      // setAccountType('')
      // setRecieved('')
      // setPresentBalance('')
      // setPreviousBalance('')
      // setMobile('')
      // setOpenDate('')
    }
   }
  const addAmounts=()=>{
  var total=parseInt(recieved.toString())+parseInt(previousBalance.toString())
    setPresentBalance(total.toString());
    Keyboard.dismiss()

    console.log(presentBalance);
  }


const submitForm =() => {

  console.log("..Submitting the Form ")

  fetch(collectionUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    AccountNo: accountNo,
    Email:email,
    Phone:mobile,
    Password:password
  })
})
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => setPostStatus(json.created));

setTimeout(() => {
  if(postStatus===1)
{
navigation.navigate('LoginScreen1');
 setPostStatus(0);
} 
  
}, 3000);



}





  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
          
            <Text style={styles.loginTitleText}>Collection</Text>
            <View style={styles.hr}></View>
            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                value={accountNo}
                onChangeText={setAccountNo}
                placeholder="Account No"
              />
            </View> */}

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.oneLineInput}
                value={accountNo}
                textContentType='accountNo'
                onChangeText={setAccountNo}
                placeholder="  Account No   "
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={()=>getAccountDetails()}>
              <Text style={styles.addButtonText}>View</Text>
            </TouchableOpacity>
            </View>
            {/* {isJson==="false"?<View><ActivityIndicator size="large" color="#00ff00" /></View>
            :<Text style={{color:'red',fontStyle:'900'}}></Text>} */}
{isView==="true"?

<View>
<View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Email</Text> */}
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Customer Name"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Email</Text> */}
              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
                placeholder="Phone"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                value={accountType}
                onChangeText={setAccountType}
                placeholder="Account Type"
                editable={false}
              />
            </View>

            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                value={openDate}
                onChangeText={setOpenDate}
                placeholder="open Date"
                editable={false}
              />
            </View>

            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Password</Text> */}
              <TextInput
                style={styles.input}
                value={previousBalance}
                onChangeText={setPreviousBalance}
                placeholder="Previous Balance"
                editable={false}
              />
            </View>
                  
<View>
<View style={styles.hr}></View>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Confirm Password</Text> */}
              <KeyboardAvoidingView style={{ flex: 1}} enabled>
              <TextInput
                style={styles.oneLineInput}
                value={recieved}
                textContentType='recieved'
                onChangeText={setRecieved}
                placeholder="    Recieved     "
                keyboardType="numeric"
              /></KeyboardAvoidingView>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={()=>addAmounts()}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                value={presentBalance}
                textContentType='presentBalance'
                onChangeText={setPresentBalance}
                placeholder="Present Balance"
                keyboardType="numeric"
                editable={false}
              />
            </View>
            </View>


            
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.addButton} onPress={()=>clearAll()}>
              <Text style={styles.addButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={()=>saveData()}>
              <Text style={styles.addButtonText}>Save</Text>
            </TouchableOpacity>
            </View>


            

</View>

: <Text></Text>}

{isSave==="true"?

<View>
<View style={styles.inputBox}>
              {/* <Text style={styles.inputLabel}>Email</Text> */}
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Customer Name"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                value={presentBalance}
                textContentType='presentBalance'
                onChangeText={setPresentBalance}
                placeholder="Present Balance"
                keyboardType="numeric"
                editable={false}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={()=>sendSMS()}>
              <Text style={styles.loginButtonText}>SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.PinkButton} onPress={()=>goPrint()}>
              <Text style={styles.loginButtonText}>PRINT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={()=>clearAll()}>
              <Text style={styles.loginButtonText}>Clear</Text>
            </TouchableOpacity>
</View>
: <Text></Text>}

    
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
    top: '3%',
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
  oneLineInput:{
    width: '150%',
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
    margin: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  PinkButton: {
    backgroundColor: '#FA2FB5',
    margin: 10,
    paddingVertical: 10,
    borderRadius: 4,
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