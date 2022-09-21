import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,  Dimensions,
  ScrollView,
  Text,Button,
  ToastAndroid,TouchableOpacity,
  View,StyleSheet,Alert
} from 'react-native';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

import ItemList from './ItemList';
import { styles } from './styles';
import Collect from './collect';
const Print = ({navigation,route}) => {
  const {firstName,Name,AccountNo,AccountType,Recieved,PresentBalance,Phone,agentUserName}=route.params;
  // const msg=" Dear "+Name+"\n"+"A/C No:"+AccountNo+"\nCredited Rs:"+Recieved+".00\nPresent Balance is Rs: "+PresentBalance
  // +".00\nThank you "+firstName
  // const [isView, setIsView] = React.useState("false");
  // const [isSave, setIsSave] = React.useState("false");
 

  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');
  const [blueStatus,setBlueStatus]=useState('false');
  const collectionUrl2 = 'http://117.220.197.82:80/saved-detail/';

//  Blue Tooth printer
const accountNo=AccountNo;
const accountType=AccountType;
const recieved=Recieved;
const presentBalance=PresentBalance;
const phone=Phone;
const bank="Bank";
// const agentUserName=agentUserName;
const Refresh=()=>{
  navigation.navigate('Print',
  { firstName:firstName.toString(),Name:name.toString(),
    AccountNo:accountNo,AccountType:accountType.toString(),
    Recieved:recieved.toString(),PresentBalance:presentBalance.toString(),
    Phone:phone,
   agentUserName:agentUserName});
}

useEffect(()=>{
  var myInterval =  setInterval(checkBluetoothStatus, 5000);
  
    
})
const goCollect=()=>{
  navigation.navigate('Collect',{firstName:firstName.toString(),agentUserName:agentUserName.toString()})

}
const gotoCollect=()=>{
  Alert.alert(
    "Do you want to go to Collection Screen?",
    "Did you take print?",
    [
      {"text":"Yes", onPress: () =>goCollect()},
      {"text":"No", onPress: () =>console.log("Pressed No")},
    ]
  )
}

const checkBluetoothStatus=()=>{
  // console.log("Hello");
  BluetoothManager.isBluetoothEnabled().then(
    enabled => {
      // console.log("enabled=",enabled);
        setBluetoothStatus()
      
      setBleOpend(Boolean(enabled));
      setLoading(false);
    }
  );
}

const setBluetoothStatus=()=>{
  setBlueStatus("true");
}
  useEffect(() => {
  

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
        ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
      });
    }
    if (pairedDevices.length < 1) {
      scan();
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = row => {
    setLoading(true);
    BluetoothManager.connect(row.address).then(
      s => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const unPair = address => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      s => {
        setLoading(false);
        setBoundAddress('');
        setName('');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      er => {
        setLoading(false);
        // ignore
      },
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: 'HSD bluetooth meminta izin untuk mengakses bluetooth',
          message: 'HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer',
          buttonNeutral: 'Lain Waktu',
          buttonNegative: 'Tidak',
          buttonPositive: 'Boleh',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  return (
      <ScrollView style={styles.container}>
        
        <View style={styles.centerizedView}>
        <View style={styles.authBox}>

<View style={styles.bluetoothStatusContainer}>
  <Text style={styles.bluetoothStatus(bleOpend ? '#47BF34' : '#A8A9AA')}>
    Bluetooth {bleOpend ? 'Active' : 'Non Active'}
  </Text>
</View>
{!bleOpend && <Text style={styles.bluetoothInfo}>Please activate your bluetooth</Text>
}
{/* <Text>
{bleOpend ? '' : 
<View>
<TouchableOpacity style={styles.loginButton} onPress={()=>Refresh()}>
<Text style={styles.loginButtonText}>Refresh</Text>
</TouchableOpacity></View>}
</Text> */}
<Text style={styles.BluetoothStatus}>Printers List:</Text>
{boundAddress.length > 0 && (
  <ItemList
    label={name}
    value={boundAddress}
    onPress={() => unPair(boundAddress)}
    actionText="Unpair"
    color="#E9493F"
  />
)}
{boundAddress.length < 1 && (
  <Text style={styles.printerInfo}>No printer connected yet</Text>
)}
{bleOpend && <Text style={styles.BluetoothStatus}>Bluetooth connected </Text>}

{loading ? <ActivityIndicator animating={true} /> : null}
<View style={styles.containerList}>
  {pairedDevices.map((item, index) => {
    return (
      <ItemList
        key={index}
        onPress={() => connect(item)}
        label={item.name}
        value={item.address}
        connected={item.address === boundAddress}
        actionText="Connect"
        color="#00BCD4"
      />
    );
  })}
</View>
<View>
{/* <Text>Click on below button :</Text> */}


<View >
<TouchableOpacity style={styles.Bluebtn} 
  onPress={async () => {
    var msg="Message"
    try{
      let response = await (fetch(
        collectionUrl2+accountNo
      ))
      let readSave = await response.json();
      // console.log("In Print, read save =",readSave)
      var data_filter1=[{"AccountNo": "", "AccountType": "", "Balance": "", "OpenDate": "", "Phone": "", "Status": "","AgentName":""}]
      data_filter1 = readSave.filter( element => element.AccountNo === accountNo && element.AgentName===agentUserName)
    //  console.log('data_filter',data_filter)
    var len = readSave.length
    // console.log("First get = ",data_filter1[len-1].AgentName===agentUserName)
    // console.log('Name=',data_filter1[len-1]['AgentName'],agentUserName)
    if(data_filter1[len-1]['AgentName']===agentUserName)
    {   
      //  alert("Found it");
       msg="Reciept No: "+data_filter1[len-1].id+", Dear "+data_filter1[len-1].Name+"\n"+", A/C No:"+data_filter1[len-1].AccountNo+" , \nCredited Rs:"+data_filter1[len-1].Recieved+"\nPresent Balance is Rs: "+data_filter1[len-1].PresentBalance
      +"\nThank you "+firstName
    
    // console.log("In Print, final  =",data_filter1[len-1])

   }
    }
    catch(e){
      console.log(e)
    }
    try{
      
    await BluetoothEscposPrinter.printerUnderLine(2);
    await BluetoothEscposPrinter.printText('\r\nBlogicITSolutions\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printerUnderLine(0);
    await BluetoothEscposPrinter.printText('\r\n', {});
    // await BluetoothEscposPrinter.printText('Reciept No: 112233\r\n',{});
    await BluetoothEscposPrinter.printText(msg, {});
    goto
    navigation.navigate('Collect',{firstName:firstName.toString(),agentUserName:agentUserName.toString()});
    
    }
    catch{
      // alert('Printer Not connected,Please check');
      alert(msg)
    }
    
    // await BluetoothEscposPrinter.printText('     Shivanand\r\n',{});
    // await BluetoothEscposPrinter.printText('A/C No: 50101\r\n',{});
    // await BluetoothEscposPrinter.printText('Previous Balance: 500Rs\r\n',{});
    // await BluetoothEscposPrinter.printText('Recieved Amount: 500Rs\r\n',{});
    // await BluetoothEscposPrinter.printText('Current Balance: 1500 Rs\r\n',{});
    // await BluetoothEscposPrinter.printText( '================================================',{},);
    
  }}
  
>
   <Text style={styles.BluebtnText}>Print Reciept</Text>
  </TouchableOpacity> 

</View>

<View>
<TouchableOpacity style={styles.Pinkbtn} 
onPress={()=>gotoCollect()}>
              <Text style={styles.PinkbtnText}>Collect</Text>
            </TouchableOpacity>
</View>
</View>

</View>
</View>
<View style={{height: 250}} />
 
      </ScrollView>

  );
};



export default Print
