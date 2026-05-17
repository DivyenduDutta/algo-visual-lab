// Animation type constants
// (Imported from animationTypes.js)

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

  // Visualize the split of the array
  animations.push({
    type: ANIMATION_TYPE.SPLIT,
    indices: [startIdx, middleIdx, endIdx],
  });

  // Base case: single element is already sorted
  if (startIdx === endIdx) {
    return;
  }

  // Recursively sort left and right halves
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

  // Merge the sorted halves
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
  // Visualize the merge operation
  animations.push({
    type: ANIMATION_TYPE.MERGE,
    indices: [startIdx, middleIdx, endIdx],
  });

  let k = startIdx; // Position in main array
  let i = startIdx; // Pointer for left subarray
  let j = middleIdx + 1; // Pointer for right subarray

  // Merge both subarrays by comparing elements
  while (i <= middleIdx && j <= endIdx) {
    animations.push({
      type: ANIMATION_TYPE.COMPARE,
      indices: [i, j],
    });

    const value =
      auxiliaryArray[i] <= auxiliaryArray[j]
        ? auxiliaryArray[i++]
        : auxiliaryArray[j++];

    animations.push({
      type: ANIMATION_TYPE.OVERWRITE,
      index: k,
      value: value,
    });

    mainArray[k++] = value;
  }

  // Copy remaining elements from left subarray
  while (i <= middleIdx) {
    const value = auxiliaryArray[i++];
    animations.push({
      type: ANIMATION_TYPE.OVERWRITE,
      index: k,
      value: value,
    });
    mainArray[k++] = value;
  }

  // Copy remaining elements from right subarray
  while (j <= endIdx) {
    const value = auxiliaryArray[j++];
    animations.push({
      type: ANIMATION_TYPE.OVERWRITE,
      index: k,
      value: value,
    });
    mainArray[k++] = value;
  }
}
