import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert, TouchableWithoutFeedback, Keyboard, Dimensions, Platform, TextInput, FlatList, ScrollView} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import { initializePlayers, generateTeams4Courts } from '../algorithm/generateTeams4Courts.mjs';
import { NameTag } from '../components/NameTag.js';

export default function InputScreen(props) {
  const windowHeight = Dimensions.get('window').height;
  const noKeyboardHeight = windowHeight - 400;
  const yesKeyboardHeight = noKeyboardHeight - 300;

  const [numCourts,   setNumCourts]  = useState(props.numCourts);
  const [playerNameList, setPlayerNameList]= useState(props.playerNameList);
  const [playerName, setPlayerName] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [flatListHeight, setFlatListHeight] = useState(noKeyboardHeight);
  const flatListRef = useRef(null);
  const [prevLength, setPrevLength] = useState(0);
  const [warningMsg, setWarningMsg] = useState("");

  function generateTeams(){
    if(numCourts>0){
      initializePlayers(playerNameList, numCourts);
      const {courtPlayers, byePlayerNames} = generateTeams4Courts();
      props.setCourtPlayers(courtPlayers);
      props.setByePlayerNames(byePlayerNames);
      props.setShowScheduleScreen(true);
      props.setPlayerNameList(playerNameList);
      props.setNumCourts(numCourts);
    }
    else{
      setWarningMsg("Must have at least 1 court");
    }
  }  
  
  const addPlayer = () => {
    const name = playerName.trim()
    if (name === "") {
      setWarningMsg("Names cannot be blank!");
    } else if (playerNameList.includes(name)){
      setWarningMsg("Names cannot repeat!");
    } else {
      setWarningMsg("");
      playerNameList.push(name);
      setPlayerName("");
    }

  }

  const removePlayer = (name) => {
    const index = playerNameList.indexOf(name);    
    if (index > -1) {
      const array = playerNameList;
      array.splice(index, 1)
      setPlayerNameList(array);
      setForceUpdate(!forceUpdate);
    }
    // make sure we don't have too many courts post-removal
    const maxCourts = Math.floor(playerNameList.length/4)
    if (maxCourts < numCourts) {
      setNumCourts(maxCourts);
    }
  }

  const seeAddedName = () => {
    // only scroll to end if we added a name, not if we removed a name
    if (prevLength < playerNameList.length) {
      flatListRef.current.scrollToEnd()
    }
    setPrevLength(playerNameList.length)
  }

  return <TouchableWithoutFeedback onPress={Keyboard.dismiss}><View>
    <View style={{height:100, backgroundColor:"lightgreen"}}>
      <View style={{height:45}}/>
      <Text style={{textAlign:"center", fontSize:40}}>Players</Text>
    </View>
    <FlatList style={{height:flatListHeight , backgroundColor:"lightgray"}}
      keyboardShouldPersistTaps='handled' 
      numColumns={2} 
      ref={flatListRef}
      onContentSizeChange={seeAddedName}
      extraData={forceUpdate}
      data={playerNameList}
      renderItem={({item, index, separators}) => 
        <NameTag keyboardShouldPersistTaps='always' name={item} key={index} removePlayer={removePlayer}/>
      }>
    </FlatList>


    <Text style={{fontSize:24, marginTop:10, marginLeft:10}}>Add Players:</Text>
    <TextInput style={{height:40, margin:12, borderWidth:1, borderRadius:10}} 
      placeholder="Enter Player Name" 
      blurOnSubmit={false}
      autoCapitalize="words"
      onChangeText={(e) => setPlayerName(e)}
      value={playerName}
      onSubmitEditing={addPlayer}
      onFocus={() => setFlatListHeight(yesKeyboardHeight)}
      onBlur={() => setFlatListHeight(noKeyboardHeight)}
      /> 
    {(warningMsg === "")? <></> : <View style={{alignItems:"center"}}><Text style={{fontSize:16, color:"red"}}>{warningMsg}</Text></View>}

    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
      <Text style={{fontSize:24, marginLeft:10}}>Courts:</Text>
      <TouchableOpacity style={styles.button} onPress={() => setNumCourts(courts => (courts > 0)? courts-1 : courts)}>
        <Text style={{fontSize:40, textAlign:"center"}}>-</Text>
      </TouchableOpacity>
      <View style={{borderRadius:10, borderWidth:1, height:60, width:60, alignItems:"center", justifyContent:"center"}}>
        <Text style={{fontSize:40}}>{numCourts}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setNumCourts(courts => (courts < Math.floor(playerNameList.length/4)? courts+1 : courts))}>
        <Text style={{fontSize:40, textAlign:"center"}}>+</Text>
      </TouchableOpacity>
    </View>
    
    <TouchableOpacity style={styles.generateButton} onPress={generateTeams}>
      <View>
        <Text style={{textAlign:"center", fontSize:32, padding:10 }}>Generate Teams!</Text>
      </View>
    </TouchableOpacity>
  </View></TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 14,
    borderWidth: 2
  },
  inputPanel:{
    flex:2
  },
  buttonView:{
    flexDirection: 'row',
    justifyContent: 'center'
  },  
  
  button:{
    height:60,
    width:60,
    padding: 1,
    margin: 12,
    borderRadius: 20,    
    backgroundColor: "aqua"
  },
  generateButton:{
    padding: 1,
    margin: 12,
    borderRadius: 20,    
    backgroundColor: "lightgreen"
  },
  buttonText:{
    padding:6,
    color:"white",
    fontSize:16,
    fontWeight: 'bold'
  }  
})

