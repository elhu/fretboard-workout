import { useState, useEffect } from "react";
import { FretboardComponent } from "../FretboardComponent";
import { DropDown } from "../DropDown";
import { minorPentatonicShapesFor, notes } from "../utils";

function PentatonicCheatSheetContainer() {
  let [root, setRoot] = useState("A");
  let [shape, setShape] = useState("1");
  let [dots, setDots] = useState([]);

  useEffect(() => {
    if (root && shape) {
      setDots(minorPentatonicShapesFor({ root, shape }).flat());
    }
  }, [root, shape]);

  return (
    <div className="exercise">
      <p>Select a pentatonic key & shape to visualize</p>
      <DropDown
        options={notes.map((n) => {
          return { value: n, text: n };
        })}
        onChange={(e) => setRoot(e.target.value)}
      />
      <DropDown
        options={Array.from({ length: 5 }, (_, i) => i + 1).map((n) => {
          return { value: n, text: `${n}` };
        })}
        onChange={(e) => setShape(e.target.value)}
      />
      <FretboardComponent dots={dots} showNotes={true} editable={false} />
    </div>
  );
}

export { PentatonicCheatSheetContainer };
