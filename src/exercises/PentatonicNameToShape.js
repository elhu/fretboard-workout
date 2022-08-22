import { useEffect, useState } from "react";
import { FretboardComponent } from "../FretboardComponent";
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

function PentatonicNameToShape(props) {
  let { root, shape, onNextClick } = props;

  let [showNotes] = useState(false);
  let [winState, setWinState] = useState();
  let [dots, setDots] = useState([]);
  let shapes = minorPentatonicShapesFor({ root, shape });

  useEffect(() => {
    setDots([]);
    setWinState();
  }, [root, shape]);

  const onFretboardClick = ({ fret, string }) => {
    const idx = dots.findIndex((x) => x.fret === fret && x.string === string);
    if (idx === -1) {
      dots = dots.concat([{ fret: fret, string: string }]);
      setDots(dots);
    } else {
      dots = dots.slice(0, idx).concat(dots.slice(idx + 1, dots.length));
      setDots(dots);
    }
  };

  const onSubmit = () => {
    let won = shapes.some((shape) => {
      dots = dots.slice(0, dots.length).sort((a, b) => {
        if (a.string === b.string) {
          return a.fret - b.fret;
        }
        return b.string - a.string;
      });
      for (const [i, dot] of dots.entries()) {
        if (dot.fret !== shape[i].fret || dot.string !== shape[i].string) {
          return false;
        }
      }
      return true;
    });
    setWinState(won);
  };

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
