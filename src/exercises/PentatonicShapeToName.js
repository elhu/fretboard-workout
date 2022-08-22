import { useState, useEffect } from "react";
import { FretboardComponent } from "../FretboardComponent";
import { DropDown } from "../DropDown";
import { minorPentatonicShapesFor, notes } from "../utils";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomRoot() {
  return notes[getRandomInt(notes.length)];
}

function randomShape() {
  return getRandomInt(5) + 1;
}

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

function PentatonicShapeToName(props) {
  let { root, shape, onNextClick, dots } = props;

  let [showNotes] = useState(false);
  let [selectedRoot, setSelectedRoot] = useState();
  let [selectedShape, setSelectedShape] = useState();
  let [winState, setWinState] = useState();

  useEffect(() => {
    console.log("");
    setWinState();
  }, [root, shape]);

  const onSubmit = () =>
    setWinState(
      selectedRoot === root && String(selectedShape) === String(shape)
    );

  let winBanner;
  if (winState === false) {
    winBanner = <p>Try again!</p>;
  }
  if (winState === true) {
    winBanner = (
      <div>
        <p>Congrats, you guessed right!</p>
        <button onClick={onNextClick}>Next</button>
      </div>
    );
  }
  return (
    <div className="exercise">
      <p>Find the key and the shape of the pentatonic below</p>
      <DropDown
        options={notes.map((n) => {
          return { value: n, text: n };
        })}
        onChange={(e) => setSelectedRoot(e.target.value)}
        defaultText="Select a root"
      />
      <DropDown
        options={Array.from({ length: 5 }, (_, i) => i + 1).map((n) => {
          return { value: n, text: `${n}` };
        })}
        onChange={(e) => setSelectedShape(e.target.value)}
        defaultText="Select a pentatonic shape"
      />
      <button onClick={onSubmit}>Submit</button>
      {winBanner}
      <FretboardComponent dots={dots} showNotes={showNotes} editable={false} />
    </div>
  );
}

export { PentatonicShapeToNameContainer };
