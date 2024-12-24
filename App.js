import { useState } from 'react';
import InputScreen from './screens/inputScreen.js';
import { ScheduleScreen } from './screens/scheduleScreen.js';

export default function App() {
  const [showScheduleScreen, setShowScheduleScreen] = useState(false);
  const [courtPlayers, setCourtPlayers] = useState([]);
  const [byePlayerNames, setByePlayerNames] = useState([]);
  const [playerNameList, setPlayerNameList] = useState([]);
  const [numCourts, setNumCourts] = useState(0);

  function handleDataFromScheduleScreen(){
    setShowScheduleScreen(false);
  }

  if (showScheduleScreen) {
    return <ScheduleScreen courtPlayers={courtPlayers} byePlayerNames={byePlayerNames} setShowScheduleScreen={setShowScheduleScreen}></ScheduleScreen>
  } else {
    return <InputScreen setCourtPlayers={setCourtPlayers} 
              setByePlayerNames={setByePlayerNames} 
              setShowScheduleScreen={setShowScheduleScreen} 
              playerNameList={playerNameList} 
              setPlayerNameList={setPlayerNameList}
              numCourts={numCourts}
              setNumCourts={setNumCourts}/>
  }
}



