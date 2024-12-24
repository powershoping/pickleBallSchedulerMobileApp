import {Player, UndefinedCount} from '../classes/Player.mjs'
import { randSample,randShuffle, getRandInt } from '../utils/random.mjs';
import { moveElement } from '../utils/array.mjs';

function addPlayers2PlayerList(nList, pList, pDict){
  const org_num = pList.length;
  const new_num = nList.length;
  for(let ii=org_num; ii<new_num; ii++){
    let player = new Player(nList[ii], ii);
    player.initCounts(new_num);
    pList.push(player);
    pDict.set(nList[ii],ii);    
  }

  for (let ii=0; ii<org_num; ii++){
    pList[ii].extendCounts(new_num-org_num);
  }
}


export function initailizePlayerList(nList, pList, pDict){
  let num_players = nList.length;
 
  for (let ii=0; ii<num_players; ii++){
      let player = new Player(nList[ii], ii);
      player.initCounts(num_players);
      pList.push(player);
      pDict.set(nList[ii], ii);
  }
}

function getPlayersWithHighBye(numPNeeded, pidList, pList){
  let byeDict = new Map();
  for (const id of pidList){
    const byeCount = pList[id].countByes;
    let val = [];
    if ( byeDict.has(byeCount) ){
      val = byeDict.get(byeCount);
    }

    val.push(id);
    byeDict.set(byeCount, val);
  }

  let byeDict1 = new Map([...byeDict.entries()].sort((a,b)=>{return (parseInt(b)-parseInt(a))}));
  let pidRlst=[];
  for (const val of byeDict1.values()){
    if(numPNeeded <=0) break;
    if(val.length <= numPNeeded){
      pidRlst.push(...val);
      numPNeeded -= val.length;
    }
    else{
      let lst = randSample(val, numPNeeded);
      pidRlst.push(...lst);
      numPNeeded = 0;
    }
  }

  return pidRlst;
}

export function get2Pairs(pidReadyList, numReadyPlayers, pList, pPairedNames){
  let scale = 3;
  let maxPaired = 0;
  let weight=[0,1];

  for (let ii = 0; ii < 2; ii++){
    let idx1 = getRandInt(0, numReadyPlayers-1);
    let pid1 = pidReadyList[idx1];
    let player1 = pList[pid1];
    numReadyPlayers = moveElement(idx1,numReadyPlayers,pidReadyList);
    let lcount = 0;
    const maxcount = scale * numReadyPlayers;
    let idx2 = getRandInt(0, numReadyPlayers -1);
    let pid2 = pidReadyList[idx2];
    let player2 = pList[pid2];

    while(true){

      if(player2.countPaired[pid1] === 0){
        break;
      }
      if(lcount === maxcount) break;

      idx2 = getRandInt(0, numReadyPlayers -1);
      pid2 = pidReadyList[idx2];
      player2 = pList[pid2];
      lcount = lcount + 1; 
    }

    player1.countPaired[pid2] += 1;
    player1.countMatches += 1;    
    player2.countPaired[pid1] += 1;
    player2.countMatches += 1;    
    
    maxPaired = Math.max(maxPaired, player1.countPaired[pid2]);
    maxPaired = Math.max(maxPaired, player2.countPaired[pid1]);       
    numReadyPlayers = moveElement(idx2, numReadyPlayers, pidReadyList);
    
    pPairedNames.push(player1.name + ' & ' + player2.name)
    weight[0] += (pid1+1) + (pid2+1); 
    weight[1] *= (pid1+1) * (pid2+1); 
  }

  return {numPlayersNeeded: numReadyPlayers, maxPaired: maxPaired, weight:weight[0]*weight[1]};
}

export function getPlayerReadyList(pList, numPNeeded){

  let matchDict = new Map();
  const numPlayers=pList.length;
  for(let id = 0; id <numPlayers; id++){
    let val = [];
    let numMatches = pList[id].countMatches;
    if (matchDict.has(numMatches)){
      val = matchDict.get(numMatches);
    }
    val.push(id);
    matchDict.set(numMatches, val);
  }

  let matchDict1 = new Map([...matchDict.entries()].sort((a,b)=> parseInt(a)-parseInt(b)));
  console.log(matchDict1);
  let pidReadyList = [];
  for(const val of matchDict1.values()){
    if(numPNeeded <=0) break;
    if(val.length <= numPNeeded){
      pidReadyList.push(...val);
      numPNeeded -= val.length;
    }
    else{
      let lst = getPlayersWithHighBye(numPNeeded, val, pList);
      pidReadyList.push(...lst);
      numPNeeded = 0;
    }
  }
  return pidReadyList;
}



export function getByePlayerNames(pidRlist, pList){
  let lst = new Array(pList.length).fill(0);
  for (const id of pidRlist){
    lst[id] = 1;
  }
  let byePnames = [];
  for (let id = 0; id <pList.length; id++ ){
    if(lst[id] == 0){
      pList[id].countByes +=1;
      byePnames.push(pList[id].name);
    }
  }

  return byePnames;
}

export function resetCountPaired(pList){
  for(let id = 0; id <pList.length; id++){
    const player = pList[id];
    player.countPaired.fill(0);
    player.countPaired[player.id] = UndefinedCount;
  }
}