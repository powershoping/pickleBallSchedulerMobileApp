import { StyleSheet, View, Text, Dimensions } from 'react-native';


export default function Court(props) {
    const windowWidth = Dimensions.get('window').width;
    const pairWidth = windowWidth * 0.9;

    return <View style={{alignItems:"center", backgroundColor:"turquoise", margin:10, padding:4, shadowOffset:{width:0, height:2}, shadowRadius:4, shadowOpacity:0.5, borderRadius:10}}>
        <Text style={{fontSize:22}}>{props.court}</Text>
        {props.playerPair.map(pair => <View key={pair} style={{alignItems:"center", backgroundColor:"white", margin:4, width:pairWidth, borderRadius:10}}>
        <Text style={{fontSize:24}}>{pair}</Text>
        </View>)}
    </View>
}