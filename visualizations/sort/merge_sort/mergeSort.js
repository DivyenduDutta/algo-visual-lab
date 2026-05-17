function generateMergeSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();

  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  const middleIdx = Math.floor((startIdx + endIdx) / 2);

  animations.push({
    type: "split",
    indices: [startIdx, middleIdx, endIdx],
  });

  if (startIdx === endIdx) {
    return;
  }

  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  animations.push({
    type: "merge",
    indices: [startIdx, middleIdx, endIdx],
  });

  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // compare
    animations.push({
      type: "compare",
      indices: [i, j],
    });

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({
        type: "overwrite",
        index: k,
        value: auxiliaryArray[i],
      });

      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({
        type: "overwrite",
        index: k,
        value: auxiliaryArray[j],
      });

      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push({
      type: "overwrite",
      index: k,
      value: auxiliaryArray[i],
    });

    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push({
      type: "overwrite",
      index: k,
      value: auxiliaryArray[j],
    });

    mainArray[k++] = auxiliaryArray[j++];
  }
}
