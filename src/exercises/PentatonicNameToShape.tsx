import { Position } from "@moonwave99/fretboard.js";
import { useEffect, useState } from "react";
import { FretboardComponent } from "../FretboardComponent";
import { FretboardHandler, Note, Shape, WinState } from "../types";
import { minorPentatonicShapesFor, randomRoot, randomShape } from "../utils";

function PentatonicNameToShapeContainer() {
  let [root, setRoot] = useState(randomRoot());
  let [shape, setShape] = useState(randomShape());

  const onNextClick = () => {
    setRoot(randomRoot());
    setShape(randomShape());
  };

  return (
    <PentatonicNameToShape
      root={root}
      shape={shape}
      onNextClick={onNextClick}
    />
  );
}

interface Props {
  root: Note;
  shape: Shape;
  onNextClick: VoidFunction;
}

function PentatonicNameToShape({ root, shape, onNextClick }: Props) {
  const [showNotes] = useState(false);
  const [winState, setWinState] = useState<WinState>("idle");
  const [dots, setDots] = useState<Position[]>([]);
  let shapes = minorPentatonicShapesFor({ root, shape });

  useEffect(() => {
    setDots([]);
    setWinState("idle");
  }, [root, shape]);

  const onFretboardClick: FretboardHandler = ({ fret, string }) => {
    const idx = dots.findIndex((x) => x.fret === fret && x.string === string);
    if (idx === -1) {
      const newDots = dots.concat([{ fret: fret, string: string }]);
      setDots(newDots);
    } else {
      const newDots = dots
        .slice(0, idx)
        .concat(dots.slice(idx + 1, dots.length));
      setDots(newDots);
    }
  };

  const onSubmit = () => {
    const won = shapes.some((shape) => {
      const hasWrongAnswers = dots
        .slice(0, dots.length)
        .sort((a, b) => {
          if (a.string === b.string) {
            return a.fret - b.fret;
          }
          return b.string - a.string;
        })
        .some(
          (dot, i) =>
            dot.fret !== shape[i].fret || dot.string !== shape[i].string
        );

      return !hasWrongAnswers;
    });
    setWinState(won ? "won" : "lost");
  };

  let winBanner;
  if (winState === "lost") {
    winBanner = <p>Try again!</p>;
  }
  if (winState === "won") {
    winBanner = (
      <div>
        <p>Congrats, you guessed right!</p>
        <button onClick={onNextClick}>Next</button>
      </div>
    );
  }
  return (
    <div className="exercise">
      <p>
        Notes to find: {root} pentatonic (shape {shape})
      </p>
      <button onClick={onSubmit}>Submit</button>
      {winBanner}
      <FretboardComponent
        onClick={onFretboardClick}
        dots={dots}
        showNotes={showNotes}
        editable={true}
      />
    </div>
  );
}

export { PentatonicNameToShapeContainer };
