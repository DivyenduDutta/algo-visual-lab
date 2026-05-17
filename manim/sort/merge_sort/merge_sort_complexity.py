from manim import (
    Scene,
    Text,
    VGroup,
    Square,
    Create,
    MoveToTarget,
    MathTex,
    FadeOut,
    Write,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    BLUE,
    YELLOW,
)


class MergeSortComplexity(Scene):

    def construct(self):

        title = Text("Merge Sort Time Complexity").scale(0.8)

        self.play(Write(title))
        self.wait(1)

        self.play(title.animate.to_edge(UP))

        # Initial array
        level0 = VGroup(
            *[Square(0.6).set_fill(BLUE, opacity=0.5) for _ in range(8)]
        ).arrange(RIGHT, buff=0.1)

        level0.move_to(UP * 2)

        self.play(Create(level0))

        self.wait(1)

        # Level 1
        left1 = level0[:4].copy()
        right1 = level0[4:].copy()

        left1.generate_target()
        right1.generate_target()

        left1.target.shift(LEFT * 1.2 + DOWN * 1.2)
        right1.target.shift(RIGHT * 1.2 + DOWN * 1.2)

        self.play(MoveToTarget(left1), MoveToTarget(right1))

        # Level 2
        groups = []

        for group in [left1, right1]:

            g1 = group[:2].copy()
            g2 = group[2:].copy()

            groups.append(g1)
            groups.append(g2)

        animations = []

        positions = [LEFT * 1.1, LEFT * -0.5, RIGHT * -0.5, RIGHT * 1.2]

        for i, g in enumerate(groups):

            g.generate_target()
            g.target.shift(positions[i] + DOWN * 1.2)

            animations.append(MoveToTarget(g))

        self.play(*animations)

        # Level 3
        groups3 = []

        for group in groups:

            g1 = group[:1].copy()
            g2 = group[1:].copy()

            groups3.append(g1)
            groups3.append(g2)

        animations = []

        positions = [
            LEFT * 1.1,
            LEFT * -0.5,
            RIGHT * -0.5,
            RIGHT * 0.5,
            LEFT * 0.5,
            LEFT * -0.5,
            RIGHT * -0.1,
            RIGHT * 0.8,
        ]

        for i, g in enumerate(groups3):

            g.generate_target()
            g.target.shift(positions[i] + DOWN * 1.2)

            animations.append(MoveToTarget(g))

        self.play(*animations)

        self.wait(1)

        # Complexity equations
        levels_text = MathTex(r"\log_2 n \text{ levels}")
        work_text = MathTex(r"O(n) \text{ work per level}")

        levels_text.move_to(DOWN * 2.5)
        work_text.move_to(DOWN * 3.5)

        self.play(Write(levels_text))
        self.play(Write(work_text))
        # remove intermediate texts before showing the final complexity
        self.play(FadeOut(levels_text), FadeOut(work_text))

        final = MathTex(r"O(n \log n)")
        final.scale(1.5)

        final.set_color(YELLOW)
        final.move_to(DOWN * 2.5)

        self.play(Write(final))

        self.wait(2)
