import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const nametagWidth = windowWidth/2-10;
const deleteButtonWidth = nametagWidth * 0.15;

export function NameTag(props) {
    return <View style={styles.nametag}>
        <Text style={{fontSize:20, width:"80%"}}>{props.name}</Text>
        <TouchableOpacity onPress={() => {props.removePlayer(props.name)}} style={{margin:1, width:deleteButtonWidth, backgroundColor:"red", borderRadius:5}}>
            <Text style={{fontSize:30, textAlign:"center", color:"white"}}>-</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({ 
    nametag: {
        backgroundColor:"lightblue", 
        width:nametagWidth,
        borderRadius:10, 
        margin:3, 
        padding:2,
        shadowOffset:{width:0, height:2}, 
        shadowRadius:4, 
        shadowOpacity:0.5,
        flexDirection:"row"
    }
})