// Color constants
const COLORS = {
  BACKGROUND: { r: 41, g: 50, b: 65 },
  NEUTRAL_BAR: { r: 131, g: 117, b: 105 },
  COMPARE: { r: 255, g: 99, b: 71 }, // Tomato red
  SPLIT: { r: 152, g: 193, b: 217 }, // Light blue
  MERGE_LEFT: { r: 0, g: 150, b: 136 }, // Teal
  MERGE_RIGHT: { r: 101, g: 113, b: 83 }, // Dark green
  TEXT: { r: 255, g: 255, b: 255 }, // White
};

class Renderer {
  constructor(values) {
    this.values = [...values];
    this.highlighted = [];
    this.highlightType = null;
    this.highlightLabels = {};
    this.mergeRange = null;
  }

  render() {
    background(
      color(COLORS.BACKGROUND.r, COLORS.BACKGROUND.g, COLORS.BACKGROUND.b),
    );

    const barWidth = width / this.values.length;

    // Draw all bars
    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];
      const barColor = this.getBarColor(i);

      fill(barColor);
      noStroke();
      rect(i * barWidth, height - value, barWidth - 2, value);

      // Draw labels for split and merge animations
      this.drawBarLabel(i, barWidth, value);
    }

    // Draw event type label (split/merge)
    this.drawEventLabel();
  }

  getBarColor(barIndex) {
    if (this.highlightType === ANIMATION_TYPE.MERGE && this.mergeRange) {
      const { startIdx, middleIdx, endIdx } = this.mergeRange;
      if (barIndex >= startIdx && barIndex <= middleIdx) {
        return color(
          COLORS.MERGE_LEFT.r,
          COLORS.MERGE_LEFT.g,
          COLORS.MERGE_LEFT.b,
        );
      } else if (barIndex > middleIdx && barIndex <= endIdx) {
        return color(
          COLORS.MERGE_RIGHT.r,
          COLORS.MERGE_RIGHT.g,
          COLORS.MERGE_RIGHT.b,
        );
      }
    } else if (this.highlighted.includes(barIndex)) {
      if (this.highlightType === ANIMATION_TYPE.COMPARE) {
        return color(COLORS.COMPARE.r, COLORS.COMPARE.g, COLORS.COMPARE.b);
      } else if (this.highlightType === ANIMATION_TYPE.SPLIT) {
        return color(COLORS.SPLIT.r, COLORS.SPLIT.g, COLORS.SPLIT.b);
      }
    }

    return color(
      COLORS.NEUTRAL_BAR.r,
      COLORS.NEUTRAL_BAR.g,
      COLORS.NEUTRAL_BAR.b,
    );
  }

  drawBarLabel(barIndex, barWidth, barHeight) {
    if (
      (this.highlightType === ANIMATION_TYPE.SPLIT ||
        this.highlightType === ANIMATION_TYPE.MERGE) &&
      this.highlightLabels[barIndex]
    ) {
      fill(COLORS.TEXT.r, COLORS.TEXT.g, COLORS.TEXT.b);
      textAlign(CENTER, BOTTOM);
      textSize(14);
      textLeading(16);

      const label = Array.isArray(this.highlightLabels[barIndex])
        ? this.highlightLabels[barIndex].join("\n")
        : this.highlightLabels[barIndex];

      text(label, barIndex * barWidth + barWidth / 2, height - barHeight - 8);
    }
  }

  drawEventLabel() {
    if (
      this.highlightType === ANIMATION_TYPE.MERGE ||
      this.highlightType === ANIMATION_TYPE.SPLIT
    ) {
      fill(COLORS.TEXT.r, COLORS.TEXT.g, COLORS.TEXT.b);
      textAlign(CENTER, TOP);
      textSize(18);
      text(this.highlightType, width / 2, 16);
    }
  }

  applyAnimation(animation) {
    this.resetState();

    switch (animation.type) {
      case ANIMATION_TYPE.COMPARE:
        this.applyCompareAnimation(animation);
        break;
      case ANIMATION_TYPE.OVERWRITE:
        this.applyOverwriteAnimation(animation);
        break;
      case ANIMATION_TYPE.SPLIT:
      case ANIMATION_TYPE.MERGE:
        this.applySplitOrMergeAnimation(animation);
        break;
    }
  }

  resetState() {
    this.highlighted = [];
    this.highlightType = null;
    this.highlightLabels = {};
    this.mergeRange = null;
  }

  applyCompareAnimation(animation) {
    this.highlighted = animation.indices;
    this.highlightType = ANIMATION_TYPE.COMPARE;
  }

  applyOverwriteAnimation(animation) {
    this.values[animation.index] = animation.value;
  }

  applySplitOrMergeAnimation(animation) {
    const [startIdx, middleIdx, endIdx] = animation.indices;
    this.highlightType = animation.type;

    if (animation.type === ANIMATION_TYPE.MERGE) {
      this.mergeRange = { startIdx, middleIdx, endIdx };
      // Highlight all bars in merge range
      this.highlighted = Array.from(
        { length: endIdx - startIdx + 1 },
        (_, i) => startIdx + i,
      );
    } else {
      // For split, highlight only the key points
      this.highlighted = [startIdx, middleIdx, endIdx];
    }

    this.addLabels(startIdx, middleIdx, endIdx);
  }

  addLabels(startIdx, middleIdx, endIdx) {
    const addLabel = (index, label) => {
      if (!this.highlightLabels[index]) {
        this.highlightLabels[index] = [];
      }
      this.highlightLabels[index].push(label);
    };

    addLabel(startIdx, `start = ${startIdx}`);
    addLabel(middleIdx, `mid = ${middleIdx}`);
    addLabel(endIdx, `end = ${endIdx}`);
  }
}
