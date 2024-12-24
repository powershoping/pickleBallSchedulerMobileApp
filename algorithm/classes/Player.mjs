export const UndefinedCount = -9999;

export class Player{
    constructor(name, idx){
        this.name = name;
        this.id   = idx;
        this.countByes = 0;
        this.countMatches = 0;
        this.countPaired = [];
    }
    initCounts(numPlayers) {
        this.countPaired = new Array(numPlayers).fill(0);
        this.countPaired[this.id] = UndefinedCount; //never can be a partner by self. 
    }
    extendCounts(num){
        let carray = [];
        carray = new Array(num).fill(0)
        this.countPaired.push(...carray);
    }
}

