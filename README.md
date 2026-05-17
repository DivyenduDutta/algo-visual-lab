# algo-visual-lab
Algorithms visualized using beautiful animations and explanations. Uses P5.js and manim.

### For developers

This project uses [pyrefly](https://pyrefly.org/) as the type checker for python in the pre-commit-config.
And for javascript, it uses ESlint and prettier in the pre-commit-config.

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
projectroot is `\manim\` folder

```bash
manim -pql sort/merge_sort/merge_sort_complexity.py MergeSortComplexity
```

### Demo

#### Merge Sort

<iframe src="https://drive.google.com/file/d/1z137v43LBnus1zSdPsdFBec--uXhb3jn/preview" width="640" height="480"></iframe>
