import { findDuplicates } from "../utils/array.mjs";


function getNiceName(name){
  const regx = /[\s]/;
  const strs = name.split(regx);
  let niceName=""
  for (const str of strs){
    if(str.charAt(0).match(/[a-zA-Z]/) !== null){
      niceName  = niceName + str[0].toUpperCase() + str.substr(1) + " ";
    }
  }
  return niceName.trim();
}

function getNiceNames(names){

  const regex = /[;\n]/;
  const names0 = names.split(regex);
  let names1 = []
  for (const name of names0 ){
    const str1 = name.trim();
    if( str1 !=="" ){
      names1.push(str1);
    }
  }

  let niceNames=[]
  for (const name of names1){
    niceNames.push(getNiceName(name));
  }
  return niceNames;
}


export function getNameList(names, duplicates){
  let niceNames = getNiceNames(names);
  console.log(niceNames);
  let nameList = [];
  const dups = findDuplicates(niceNames, nameList);
  duplicates.push(...dups);
  // console.log("dupdupdup:", duplicates)
  // console.log(nameList);
  return nameList;
}


export function addNames2NameList(names, nList, duplicates){
  let niceNames = getNiceNames(names);
  nList.push(...niceNames);
  let uniqueList = [];
  duplicates = findDuplicates(nList, uniqueList);
  nList = uniqueList.slice();

}

