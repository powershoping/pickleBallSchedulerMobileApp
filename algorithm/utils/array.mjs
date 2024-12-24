export function moveElement(idx1, idx2, lst){ //idx2 is the number of the players in the list available to choose

  let elem = lst[idx1];
  idx2 = idx2 -1;
  lst[idx1] = lst[idx2];
  lst[idx2] = elem;
  
  return idx2;
}

export const arrayEqual = (a, b) =>{
  return (a.length === b.length &&
  a.every((element, index) => element === b[index]));
}


export function findDuplicates(arr, uniqueArray) {
  const uniqueSet = new Set();
  const dups = [];

  for (const element of arr) {
    if (uniqueSet.has(element)) {
      dups.push(element);
    } else {
      uniqueSet.add(element);
    }
  }
  uniqueArray.push(...uniqueSet);

  return dups;
}
