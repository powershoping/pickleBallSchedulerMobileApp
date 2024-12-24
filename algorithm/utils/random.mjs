

export function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


export const randShuffle = arr => {
  let mmax = arr.length-1;
  while (mmax) {
    const ii = getRandInt(0,mmax);
    mmax --;
    [arr[mmax], arr[ii]] = [arr[ii], arr[mmax]];
  }
  return arr;
};


export function randSample(lst, num){
  let shuffled = randShuffle(lst);
  return shuffled.slice(0, num);
}

