import "./App.css";
import { useState } from "react";
import { FretboardComponent } from "./FretboardComponent";
import { minorPentatonicShapesFor } from "./utils";

function App() {
  let [dots, setDots] = useState(
    minorPentatonicShapesFor({ shape: 5, root: "C#" }).flat()
  );

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
