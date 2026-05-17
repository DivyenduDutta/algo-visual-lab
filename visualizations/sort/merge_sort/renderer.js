class Renderer {
  constructor(values) {
    this.values = [...values];

    this.highlighted = [];
    this.highlightType = null;
    this.highlightLabels = {};
    this.mergeRange = null;
  }

  render() {
    background(color(41, 50, 65));

    const barWidth = width / this.values.length;

    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];

      let colorValue = color(131, 117, 105);

      if (this.highlightType === "merge" && this.mergeRange) {
        const { startIdx, middleIdx, endIdx } = this.mergeRange;
        if (i >= startIdx && i <= middleIdx) {
          colorValue = color(0, 150, 136); // left sub-array: teal
        } else if (i > middleIdx && i <= endIdx) {
          colorValue = color(101, 113, 83); // right sub-array: orange
        }
      } else if (this.highlighted.includes(i)) {
        if (this.highlightType === "compare") {
          colorValue = color(255, 99, 71); // compare: tomato/red
        } else if (this.highlightType === "split") {
          colorValue = color(152, 193, 217); // split: original light blue
        } else {
          colorValue = color(152, 193, 217);
        }
      }

      fill(colorValue);
      noStroke();

      rect(i * barWidth, height - value, barWidth - 2, value);

      if (
        (this.highlightType === "split" || this.highlightType === "merge") &&
        this.highlightLabels[i]
      ) {
        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(14);
        textLeading(16);
        const label = Array.isArray(this.highlightLabels[i])
          ? this.highlightLabels[i].join("\n")
          : this.highlightLabels[i];
        text(label, i * barWidth + barWidth / 2, height - value - 8);
      }
    }

    if (this.highlightType === "merge" || this.highlightType === "split") {
      fill(255);
      textAlign(CENTER, TOP);
      textSize(18);
      text(this.highlightType, width / 2, 16);
    }
  }

  applyAnimation(animation) {
    this.highlighted = [];
    this.highlightType = null;
    this.highlightLabels = {};
    this.mergeRange = null;

    if (animation.type === "compare") {
      this.highlighted = animation.indices;
      this.highlightType = "compare";
    } else if (animation.type === "overwrite") {
      this.values[animation.index] = animation.value;
    } else if (animation.type === "split" || animation.type === "merge") {
      const [startIdx, middleIdx, endIdx] = animation.indices;
      this.highlightType = animation.type;
      if (animation.type === "merge") {
        this.mergeRange = { startIdx, middleIdx, endIdx };
        this.highlighted = [];
        for (let idx = startIdx; idx <= endIdx; idx++) {
          this.highlighted.push(idx);
        }
      } else {
        this.highlighted = [startIdx, middleIdx, endIdx];
      }

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
}
