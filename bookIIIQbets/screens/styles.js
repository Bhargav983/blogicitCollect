import { StyleSheet,Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'pink'
  }, centerizedView: {
    width: '100%',
    top: '20%',
  },
  containerList: { flex: 1, flexDirection: 'column' },
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  bluetoothStatus: color => ({
    backgroundColor: color,
    padding: 8,
    borderRadius: 12,
    color: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
    marginTop:10
  }),
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: 'red', marginBottom: 20,fontWeight:'500' },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12, },
  BluetoothStatus:{fontWeight: 'bold', fontSize: 18, marginBottom: 12,textAlign:'center',color:'black'},
  printerInfo: { textAlign: 'center', fontSize: 16, color: 'red', marginBottom: 20 },
  Bluebtn:{
    backgroundColor: '#3AB0FF',
    marginTop: 35,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom:30
  }, BluebtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Pinkbtn:{
    backgroundColor: '#FA2FB5',
    marginTop: 35,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom:30
  }, PinkbtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
  },bigCircle: {
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
});