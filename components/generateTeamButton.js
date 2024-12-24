
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function GenerateTeamsButton() {

  function onPressHandler(){
    Alert.alert("pressed");
  }  

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}> Generate Teams </Text>
        </View>
      </TouchableOpacity>   
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
    padding: 10,
    margin: 5,
    borderRadius: 5,    
  }
});
