names="shaoping quan ; lin qiu; JD; chencheng ;\n yuxing yao;"
function getNiceName(name){
  const regx = /[\s]/;
  strs = name.split(regx);
  niceName=""
  for (str of strs){
    if(str.charAt(0).match(/[a-zA-Z]/) !== null){
      niceName  = niceName + str[0].toUpperCase() + str.substr(1) + " ";
    }
  }
  return niceName.trim();
}
function getNameList(names){
  const regex = /[;\n]/;
  const names0 = names.split(regex);
  console.log(names0);
  let names1 = []
  for (const name of names0 ){
    const str1 = name.trim();
    if( str1 !=="" ){
      names1.push(str1);
    }
  }
  console.log(names1);
  nameList=[]
  for (const name of names1){
    console.log("oldname: ",name)
    nameList.push(getNiceName(name));
  }
  return nameList;
}
console.log(names);
console.log(getNameList(names));


class Player{
    constructor(name,idx){
        this.name = name;
        this.id   = id;
        this.count_bye = 0;
        this.count_matches = 0;
        this.count_paired = [];
    }
    init_counts(num_players) {
        this.count_paired = new Array(num_players).fill(0);
        this.count_paired[this.id] = -9999; //never can be a partner by self. 
    }
    extend_counts(num){
        carray = new Array(num).fill(0)
        this.count_paired.push(...carray);
    }
}

function initailizePlayerList(names){
    nameList =getNameList(names);
    num_players = nameList.length;
    playerList = [];

    for (let ii=0; ii<num_players; ii++){
        let player = new Player(nameList[ii], ii);
        player.init_counts(num_players);
        playerList.push(player);
    }
}

function addNames2playerList(names,playerList){
    nameList = getNameList(names);
    org_num = playerList.length;
    added_num = nameList.length;
    num_players = org_num + added_num;
    for (let ii = 0; ii<added_num; ii++){
        let player = new Player(nameList[ii], ii+org_num);
        player.init_counts(num_players);
        playerList.push(player);
    }
    for (let ii = 0; ii <org_num; ii++){
        playerList[ii].extend_counts(added_num);
    }
}