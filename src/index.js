module.exports = function longestConsecutiveLength(array) {
  const LENGTH = array.length;
  if (LENGTH == 0)
    return 0;
  array.sort(function(a, b) {
    return a - b;
  });
  const STEP = 1;
  let biggest = {
	  start: 0, 
	  end: 0, 
	  penalty: 0,
  };
  let curr = {
	  start: -1, 
	  end: -1, 
	  penalty: 0,
  };
  for (let i = 1; i < LENGTH; i++) {
    if (array[i] == array[i - 1]) {
	    if (curr.start == -1) {
		    curr.start = i - 1;
	    }
      curr.end = i;
      curr.penalty++;
      continue;
    }
    if (array[i] - array[i - 1] == STEP) {
      curr.end = i;
      if (curr.start == -1) {
        curr.start = i - 1;
      }
    }
    else if (curr.start != -1) {
      if (currIsBigger(curr, biggest)) {
        refreshBiggest(curr, biggest);
        resetCurr(curr);
      }
      else {
        resetCurr(curr);
      }
    }
  }
  let currLen = calclen(curr), biggestLen = calcLen(biggest);
  return currLen > biggestLen ? currLen : biggestLen;
}

function currIsBigger(curr, biggest) {
  return  calcLen(curr) > calcLen(biggest);
}

function calcLen(obj) {
  return obj.end - obj.start - obj.penalty + 1;
}

function refreshBiggest(curr, biggest) {
  biggest.start = curr.start;
  biggest.end = curr.end;
  biggest.penalty = curr.penalty;
}

function resetCurr(curr) {
  curr.start = -1;
  curr.end = -1;
  curr.penalty = 0;
}