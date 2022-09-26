import { useState, useEffect } from "react";
import { Position } from "@moonwave99/fretboard.js";
import { FretboardComponent } from "../FretboardComponent";
import { DropDown } from "../DropDown";
import {
  getRandomInt,
  minorPentatonicShapesFor,
  notes,
  randomRoot,
  randomShape,
} from "../utils";
import { Note, PentatonicShape, WinState } from "../types";

function PentatonicShapeToNameContainer() {
  let [root, setRoot] = useState(randomRoot());
  let [shape, setShape] = useState(randomShape());
  let shapes = minorPentatonicShapesFor({ root, shape });
  let dots = shapes[getRandomInt(shapes.length)];

  const onNextClick = () => {
    setRoot(randomRoot());
    setShape(randomShape());
  };

  return (
    <PentatonicShapeToName
      root={root}
      shape={shape}
      dots={dots}
      onNextClick={onNextClick}
    />
  );
}

interface Props {
  root: Note;
  shape: PentatonicShape;
  onNextClick: VoidFunction;
  dots: Position[];
}

function PentatonicShapeToName({ root, shape, onNextClick, dots }: Props) {
  let [showNotes] = useState(false);
  let [selectedRoot, setSelectedRoot] = useState<Note>();
  let [selectedShape, setSelectedShape] = useState<PentatonicShape>();
  let [winState, setWinState] = useState<WinState>("idle");

  useEffect(() => {
    setWinState("idle");
  }, [root, shape]);

  const onSubmit = () =>
    setWinState(
      selectedRoot === root && String(selectedShape) === String(shape)
        ? "won"
        : "lost"
    );

  return (
    <div className="exercise">
      <p>Find the key and the shape of the pentatonic below</p>
      <DropDown
        options={notes.map((n) => {
          return { value: n, text: n };
        })}
        onChange={(e) => setSelectedRoot(e.target.value as Note)}
        defaultText="Select a root"
      />
      <DropDown
        options={Array.from({ length: 5 }, (_, i) => i + 1).map((n) => {
          return { value: String(n), text: String(n) };
        })}
        onChange={(e) => setSelectedShape(Number(e.target.value) as PentatonicShape)}
        defaultText="Select a pentatonic shape"
      />
      <button onClick={onSubmit}>Submit</button>
      {winState === "won" && (
        <div>
          <p>Congrats, you guessed right!</p>
          <button onClick={onNextClick}>Next</button>
        </div>
      )}

      {winState === "lost" && (
        <div>
          <p>Try again</p>
        </div>
      )}
      <FretboardComponent dots={dots} showNotes={showNotes} editable={false} />
    </div>
  );
}

export { PentatonicShapeToNameContainer };
