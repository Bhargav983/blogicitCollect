import React from 'react';
import { Text, View,TouchableOpacity,ScrollView } from 'react-native';
import {styles} from '../assets/Styles/generalStyles'
const ReadReport = ({navigation,route}) => {
    const {RecieptNo,firstName,Name,AccountNo,AccountType,Recieved,PresentBalance,Phone,agentUserName}=route.params;
    const [focusforprint,setFocusForPrint]=React.useState(0);

    const delete1=()=>{
      alert('In progress..');
    }

    const sendSMS=()=>{
        navigation.navigate('Sms', 
        { firstName:firstName,Name:Name,
          AccountNo:AccountNo,AccountType:AccountType,
          Recieved:Recieved,PresentBalance:PresentBalance,
          Phone:Phone,agentUserName:agentUserName});
          
        }
        const goPrint=()=>{
                //  setFocusForPrint(focusforprint+1);
              navigation.navigate('Print1',
               { firstName:firstName,Name:Name,
                AccountNo:AccountNo,AccountType:AccountType,
                Recieved:Recieved,PresentBalance:PresentBalance,
                Phone:Phone, agentUserName:agentUserName});
              
           }
        const goHome=()=>{

            navigation.navigate('Home',
               { firstName:firstName,agentUserName:agentUserName});
        }
    

       
  return (
    <ScrollView>
    <View style={styles.container}>

    <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>

        <View style={[styles.centerizedView,{top:'2%'}]}>
          <View style={[styles.authBox,{bottom:'2%'}]}>
            <View style={{margin:10}}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                 <Text style={{color:'black',fontWeight:'900',fontSize:20}}> Reciept No </Text>
            </View>
            <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                 <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {RecieptNo} </Text>
            </View>
          </View>

        <View style={{flexDirection:'row'}}>
          <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> Account No </Text>
          </View>
          <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {AccountNo} </Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
            <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                 <Text style={{color:'black',fontWeight:'900',fontSize:20}}>  Account Type  </Text>
            </View>
            <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                 <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {AccountType} </Text>
            </View>
          </View>

        <View style={{flexDirection:'row'}}>
          <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}>Name</Text>
          </View>
          <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {Name} </Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
            <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                 <Text style={{color:'black',fontWeight:'900',fontSize:20}}> Recieved </Text>
            </View>
            <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                 <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {Recieved} </Text>
            </View>
          </View>

        <View style={{flexDirection:'row'}}>
          <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> Present Balance </Text>
          </View>
          <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {PresentBalance} </Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> Mobile </Text>
          </View>
          <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {Phone} </Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{width:120,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> AgentName </Text>
          </View>
          <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
            <Text style={{color:'black',fontWeight:'900',fontSize:20}}> {firstName} </Text>
          </View>
        </View>


        <TouchableOpacity style={[styles.BlueButton,{marginTop:10}]} onPress={()=>sendSMS()}>
              <Text style={styles.ButtonText}>SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.PinkButton,{marginTop:7}]} onPress={()=>goPrint()}>
              <Text style={styles.ButtonText}>PRINT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.BlueButton,{marginTop:-15}]} onPress={()=>goHome()}>
              <Text style={styles.ButtonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.PinkButton,{marginTop:7}]} onPress={()=>navigation.navigate('Report',{firstName:firstName})}>
              <Text style={styles.ButtonText}>Back</Text>
            </TouchableOpacity>

             </View>

             </View>
      
            </View>
            </View>
            </ScrollView>
  )
}
export default ReadReport;