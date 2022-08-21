import "./App.css";
import { useEffect, useState } from "react";
import { FretboardComponent } from "./FretboardComponent";
import { DropDown } from "./DropDown";
import { minorPentatonicShapesFor, notes } from "./utils";

function App() {
  let [dots, setDots] = useState([]);
  let [root, setRoot] = useState(undefined);
  let [shape, setShape] = useState(undefined);

  useEffect(() => {
    if (root !== undefined && shape !== undefined) {
      setDots(minorPentatonicShapesFor({ root, shape }).flat());
    }
  }, [shape, root]);

  const onFretboardClick = ({ fret, string }) => {
    const idx = dots.findIndex((x) => x.fret === fret && x.string === string);
    if (idx == -1) {
      dots = dots.concat([{ fret: fret, string: string }]);
      setDots(dots);
    } else {
      dots = dots.slice(0, idx).concat(dots.slice(idx + 1, dots.length));
      setDots(dots);
    }
  };

  return (
    <div className="App">
      <DropDown
        options={notes.map((n) => {
          return { value: n, text: n };
        })}
        defaultText="Select a root"
        onChange={(e) => setRoot(e.target.value)}
      />
      <DropDown
        options={Array.from({ length: 5 }, (_, i) => i + 1).map((n) => {
          return { value: `${n}`, text: `${n}` };
        })}
        defaultText="Select a pentatonic shape"
        onChange={(e) => setShape(e.target.value)}
      />
      <FretboardComponent
        dots={dots}
        showNotes={true}
        onClick={onFretboardClick}
        editable={true}
      />
    </div>
  );
}

export default App;
