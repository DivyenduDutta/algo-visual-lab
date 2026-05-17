# algo-visual-lab
<div align="center">

  <p><em>Algorithms visualized using beautiful animations and explanations. Uses P5.js and manim.</em></p>

  <p>
    <a href="https://github.com/DivyenduDutta/algo-visual-lab/blob/master/LICENSE"><img src="https://img.shields.io/github/license/DivyenduDutta/algo-visual-lab?style=flat-square" alt="License"></a>
    <a href="https://github.com/ambv/black"><img src="https://img.shields.io/badge/code%20style-black-000000.svg" alt="Black"></a>
  </p>
![CI](https://github.com/DivyenduDutta/algo-visual-lab/actions/workflows/ci.yml/badge.svg)
</div>

### For developers

This project uses [pyrefly](https://pyrefly.org/) as the type checker for python in the pre-commit-config.

And for javascript, it uses [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) in the pre-commit-config.

To setup pre-commit-config, run `pre-commit install` from the root directory ie, `algo-visual-lab`.

Then run the pre-commit-config using `pre-commit run --file <file_name1.py> [<file_name2.py> ...]`

### Visualization - p5.js

- Open `index.html` of any algorithm in the browser to visualize.


### Explanation - Manim

`note` : Be inside the `manim` folder and run the below

```bash
python -m venv .venv
```

```bash
.venv\Scripts\activate.bat
```

```bash
pip install -r requirements.txt
```

```bash
$env:PYTHONPATH = \full\path\to\projectroot
```
projectroot is `\algo-visual-lab\` folder

```bash
manim -pql sort/merge_sort/merge_sort_complexity.py MergeSortComplexity
```

### Demo

#### Merge Sort

> Click the images to watch the video

[![Merge Sort Visualized](https://github.com/user-attachments/assets/71ec1d04-f78a-4c0b-96c1-40f5fd973c93)](https://drive.google.com/file/d/1z137v43LBnus1zSdPsdFBec--uXhb3jn/view?usp=sharing)

[![Merge Sort Time Complexity](https://github.com/user-attachments/assets/daa65f62-5af9-4858-bbe9-8a7a0ac93453)](https://drive.google.com/file/d/13ifXcYKlytm3IeLO9dnz3vCNhz99O1Xg/view?usp=sharing)
