import { template } from '@babel/core';
import React, { useState} from 'react';
import { Text, View,FlatList } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

import {fetchReport} from '../redux/actions/reportActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const Report = ({ navigation,route }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {firstName}=route.params;
    componentDidMount=()=> {
      this.props.fetchReport()
      // console.log(this.props.fetchReport());
    }
  
    const savedUrl='http://117.220.197.82/saved-detail-user/mallu606/';
    const getAccountDetails = async () => {
        try {
          let response = await fetch(
            savedUrl
          )
          let readSave = await response.json();
          setData(readSave);
          setLoading(false);
          console.log('readSave=',readSave);
        }
        catch(e){
            console.log("error=",e);
        }
    }
    
      useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused.
          getAccountDetails()
        //  alert('Home Screen was focused');
          return () => {
         // Do something when the screen is unfocused
            // alert('Home Screen was unfocused');
          };
        }, [])
      );
    
      const goReadSheet=(item)=>{
        // alert(item);
        console.log('item=',item)
         navigation.navigate('ReadReport',{RecieptNo:item.id,firstName:item.firstName,agentUserName:item.AgentName,
            Phone:item.Phone,PresentBalance:item.PresentBalance,AccountType:item.AccountType,
            Name:item.Name,AccountNo:item.AccountNo,Recieved:item.Recieved})
       }
      const getItem=({ item }) => (
            <>
              <View style={{flexDirection:'row',paddingLeft: 20,paddingTop:2 }}>
                        <View style={{width:160,height:35,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                           <Text style={{color:'black',fontSize:25}}>{item.AccountNo} </Text>
                           </View>
                           <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}>
                    <Text style={{color:'black',fontSize:25}} onPress={()=>{
                        navigation.navigate('ReadReport',
                        {RecieptNo:item.id,firstName:firstName,agentUserName:item.AgentName,
                            Phone:item.Phone,PresentBalance:item.PresentBalance,AccountType:item.AccountType,
                            Name:item.Name,AccountNo:item.AccountNo,Recieved:item.Recieved})
                        }}>{item.Recieved} </Text>
                    </View>
                    </View>
            </>
          )
      
      return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      {/* <Text onPress={()=>getAccountDetails()}>Hello, world!</Text> */}
      <View style={{ flexDirection: 'row', paddingLeft: 20,paddingTop:20  }}>
                <View style={{width:160,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}><Text style={{color:'black',fontWeight:'900',fontSize:25}}> AccountNo </Text></View>
                <View style={{width:150,backgroundColor:'#F0EBE3',alignItems:'center',borderColor:"black",borderWidth:1}}><Text style={{color:'black',fontWeight:'900',fontSize:25}}> Recieved </Text></View>

        </View>
      <FlatList
  keyExtractor={(item) => item.id}
  data={data}
  renderItem={(item)=>getItem(item)}
/>
  <Text style={{marginTop:15}}></Text>
    </View>
  )
}
export default Report;