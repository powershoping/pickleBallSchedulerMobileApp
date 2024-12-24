import React from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import {getNameList} from '../algorithm/source/names.mjs'

export function InputPlayerPanel({sendDataFromInputPanel}) {
  const [enteredNames,     setEnteredNames]      = React.useState('');
  const [savedEnteredNames, setSavedEnteredNames] = React.useState('');  
  const [enteredNumber,     setEnteredNumber]      = React.useState(0);
  //const [onSubmit,       setOnSubmit]      = useState(false);

  // function playerInputHandler(enteredText){
  //   setEnteredText(enteredText);
  // }

  // function enteredNumberHandler(enteredText){
  //   setEnteredText(enteredText);
  // }
  function submitHandler(){
    setSavedEnteredNames(enteredNames);
    let dups= [];
    let nameList = getNameList(enteredNames,dups);
    console.log("name list:", nameList);
    sendDataFromInputPanel(enteredNames, nameList, enteredNumber, true);
    Keyboard.dismiss();
    //Alert.alert(JSON.stringify(nameList)); // use JSON.stringify() to prevent crashes
    if(dups.length>0){
      Alert.alert("There are duplicated names \n" + JSON.stringify(dups) +"\n Duplicated names will be ignored");
    }
  }  
  function clearHandler(){
    setEnteredNames('');
    setEnteredNumber(0);
    sendDataFromInputPanel("", [], 0, false);
//    getInputPanelInfo(enteredNames, enteredNumber, false);
    Alert.alert(savedEnteredNames);
  }

  return (
    <View>

      <Text style={styles.header}>
        Input Player Names
      </Text>
      <TextInput style={styles.textInput} 
        editable={true}
        multiline={true}
        allowFontScaling={true}
        scrollEnabled={true}
        autoCorrect={false}
        autoComplete={false}
        autoCapitalize={'none'}
        placeholder='Please input player names separated by ;'
        value={enteredNames}
        onChangeText={setEnteredNames}
      />
      <View style={styles.rowContainer}>
        <Text style={styles.header}>Number of Courts </Text>
        <View style={styles.numberView}>
        <TextInput style={styles.numberInput} 
          editable={true}
          multiline={false}
          scrollEnabled={false}
          placeholder='0'
          maxLength={2}
          keyboardType='numeric'
          value={enteredNumber}
          onChangeText={setEnteredNumber}
        />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button} onPress={clearHandler}>
            <Text style={styles.buttonText}>  Clear  </Text>
        </TouchableOpacity>      

        <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 5,
    borderWidth: 2
  },
  
  header: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    borderWidth:2,
    borderColor: 'black',
    borderRadius:15,
    minHeight:150,
    maxHeight:150,
    textAlignVertical:'top',
    textAlign:'left',
  },
  numberInput: {
    fontSize: 16,
    width:50,
    height:25,
    padding: 1,
    borderWidth:2,
    borderColor: 'black',
    borderRadius:15,
    textAlignVertical:'cener',
    textAlign:'center',
  },
  numberView:{
    paddingTop:8,
  },
  textOutput:{
    fontSize: 20,
    textAlignVertical:'top',
    textAlign:'left',    
  },
  playerList: {
    fontSize: 14,
    padding: 10,
    borderWidth:2,
    borderColor: 'black',
    borderRadius:15,
    minHeight:100,
    textAlignVertical:'top',
    textAlign:'left',
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    margin:1,
    marginTop:18,
    marginBottom:-10,
  },
  button:{
    padding: 1,
    marginLeft: 20,
    marginRight:20,
    marginTop:0,
    borderRadius: 20,    
    borderWidth:2,
    borderColor: "blue",
    backgroundColor: "blue"
  },
  buttonText:{
    padding:6,
    color:"white",
    fontSize:16,
    fontWeight: 'bold',
  }
});
