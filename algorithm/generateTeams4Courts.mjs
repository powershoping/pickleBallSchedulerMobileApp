import {getNameList} from './source/names.mjs';
import {initailizePlayerList, getByePlayerNames, get2Pairs, getPlayerReadyList,resetCountPaired} from './source/player.mjs';
import {randSample} from './utils/random.mjs';
import {arrayEqual} from './utils/array.mjs';
import {Player} from './classes/Player.mjs'
import _ from 'lodash';

let playerList = [];
let playerDict = new Map();
let playerPairsWeight = [];
let playerPairsWeight1 = [];
let numCourts = 0;
let numPlayers = 0;
const maxCountsRepeated4 = 2;
const numPlayersPerCourt = 4;
let numberBatches = 0;
let multiplicant = 0 

export function initializePlayers(nameList, numberCourts){
  console.log(nameList);
  console.log(nameList.length);
  numCourts = numberCourts;
  numPlayers = nameList.length;
  initailizePlayerList(nameList, playerList, playerDict);
  playerPairsWeight = new Array(numCourts).fill(0);
  playerPairsWeight1 = new Array(numCourts).fill(0);
  multiplicant = Math.floor(numPlayers*3/4);

}
export function resetPlayers(){

  playerList = [];
  playerDict = new Map();
  playerPairsWeight = [];
  playerPairsWeight1 = [];
  numCourts = 0;
  numPlayers = 0;
  numberBatches = 0;
  multiplicant = 0;
  playerList = [];
  playerDict = new Map();
  playerPairsWeight = [];
  playerPairsWeight1 = [];

}

export function generateTeams4Courts(){

  console.log("number of player is :", playerList.length);
  for(const player of playerList){
    console.log("playerName:", player.name)
  }

  let numPlayersNeeded = numCourts * numPlayersPerCourt;
  let pIDReadyList = [];
  if(numberBatches === 0){
    const lst = [...Array(numPlayers).keys()];
    pIDReadyList = randSample(lst, numPlayersNeeded);
  }
  else
  {
    pIDReadyList = getPlayerReadyList(playerList, numPlayersNeeded);
    if(numberBatches % multiplicant === 0){
      resetCountPaired(playerList);
    }
  }
  numberBatches += 1; 

  let byePlayerNames = getByePlayerNames(pIDReadyList, playerList);

  const numTries = numCourts * 2;
  let numPlayersNeeded1 = numPlayersNeeded;
  let pIDReadyList1 = _.cloneDeep(pIDReadyList);
  let playerList1 = _.cloneDeep(playerList);
  let countRepeated4 = 0;
  let playerPairsNames = [];

  for(let nnt =0; nnt < numTries; nnt++){
    let maxPaired = 0; 
    let repeated4 = false;
    if(nnt >0 ){  // more than 1 try, restore pIDReadyList and playerList, and numPlayersNeeded.
      numPlayersNeeded = numPlayersNeeded1;
      pIDReadyList     = _.cloneDeep(pIDReadyList1);
      playerList       = _.cloneDeep(playerList1);
    }

    for (let icourt = 0; icourt < numCourts; icourt ++){
      let pPairedNames =[];
      let data2Pairs = get2Pairs(pIDReadyList,numPlayersNeeded, playerList, pPairedNames);
      maxPaired = Math.max(maxPaired,data2Pairs.maxPaired);
      numPlayersNeeded = data2Pairs.numPlayersNeeded;
      playerPairsWeight[icourt] = data2Pairs.weight;
      playerPairsNames.push(pPairedNames);
      console.log("MMMMMM, :", maxPaired, data2Pairs.maxPaired);

    }
    if(arrayEqual(playerPairsWeight,playerPairsWeight1)){
      countRepeated4 +=1;
      repeated4 = true;
    }  

    if(maxPaired === 1){
      if(countRepeated4 > maxCountsRepeated4){
        break;
      }
      else{
        if(!repeated4) {
          console.log("success");
          break;
        }
      }
    }
    else{
      console.log("maxPaired not equal 1 repeat ", nnt)
    }
  }

  playerPairsWeight1 = playerPairsWeight.slice();

  let playerSection =[];
  for(let icourt = 0; icourt<numCourts; icourt ++){
    console.log("Court ", icourt+1, ": ", playerPairsNames[icourt][0], " vs ", playerPairsNames[icourt][1] );
    let court = "Court " + (icourt+1).toString();
    playerSection.push({court : court, playerPair: playerPairsNames[icourt] })
  }
  console.log("Bye: ",byePlayerNames);

  return {courtPlayers:playerSection, byePlayerNames:byePlayerNames}
}

















