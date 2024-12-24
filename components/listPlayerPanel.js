import React from 'react';
import { Text, StyleSheet, View, ScrollView, Alert } from 'react-native';

export function ListPlayerPanel({nameList}) {

  return (
    <View >
      <Text style={styles.header}>
        List of Player Names
      </Text>
      <ScrollView style={styles.playerList}>
        {
          nameList.map((text, index)=>
            (<Text style={styles.playerName} key={index} > {index+1}. {text}</Text>)
         )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playerList: {
    fontSize: 14,
    padding: 10,
    marginLeft:40,
    marginRight:40,
    borderWidth:2,
    borderColor: 'black',
    borderRadius:15,
    minHeight:200,
    maxHeight:200,
    textAlignVertical:'top',
    textAlign:'left',
  },
  playerName: {
    fontSize: 16,
  },
});
