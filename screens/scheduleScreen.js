import {StyleSheet,View, TouchableOpacity, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { generateTeams4Courts, resetPlayers } from '../algorithm/generateTeams4Courts.mjs';
import { useState } from 'react';
import Court from '../components/Court.js';

const windowWidth = Dimensions.get('window').width;
const byePlayerWidth = windowWidth * 0.45;

export function ScheduleScreen(props){
  const [courtPlayers, setCourtPlayers]     = useState(props.courtPlayers);
  const [byePlayerNames, setByePlayerNames] = useState(props.byePlayerNames);

  function nextBatchHandler(){
    const result = generateTeams4Courts();
    setCourtPlayers(result.courtPlayers);
    setByePlayerNames(result.byePlayerNames);
  }

  function restartHandler(){
    resetPlayers();
    props.setShowScheduleScreen(false);
  }

  return <View>
    <View style={{height:100, backgroundColor:"lightblue", shadowOffset:{width:0, height:2}, shadowRadius:4, shadowOpacity:0.5}}>
          <View style={{height:45}}/>
          <Text style={{textAlign:"center", fontSize:40}}>Courts</Text>
    </View>
    <ScrollView style={{height:400, backgroundColor:"lightgray"}}>
      {courtPlayers.map(court => <Court {...court} key={court.court}></Court>)}
    </ScrollView>

    <View style={{backgroundColor:"lightblue", shadowOffset:{width:0, height:2}, shadowRadius:4, shadowOpacity:0.5}}>
      <Text style={{textAlign:"center", fontSize:32}}>Bye Players</Text>
    </View>
    <FlatList style={{height:150, backgroundColor:"lightgray"}}
      numColumns={2} 
      data={byePlayerNames}
      renderItem={({item, index, separators}) => 
        <View key={index} style={{alignItems:"center", backgroundColor:"lightgreen", width:byePlayerWidth, margin:3, padding:2, shadowOffset:{width:0, height:2}, shadowRadius:4, shadowOpacity:0.5, borderRadius:10}}>
          <Text style={{fontSize:20}}>{item}</Text>
        </View>
      }>
    </FlatList>

    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", margin:10}}>
      <TouchableOpacity style={styles.button} onPress={restartHandler}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={nextBatchHandler}>
        <Text style={styles.buttonText}>Next Match</Text>
      </TouchableOpacity>      
    </View>
  </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:15,
      },
      button:{
        padding: 1,
        height:70,
        width:byePlayerWidth,
        alignItems:"center", 
        justifyContent:"center",
        margin:10,
        borderRadius: 20,    
        backgroundColor: "blue"
      },
      buttonText:{
        padding:6,
        color:"white",
        fontSize:25,
        fontWeight: 'bold',
      },

});