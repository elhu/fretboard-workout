import { useState, useEffect } from "react";
import { Position } from "@moonwave99/fretboard.js";
import { FretboardComponent } from "../FretboardComponent";
import { DropDown } from "../DropDown";
import { minorPentatonicShapesFor, notes } from "../utils";
import { Note, Shape } from "../types";

function PentatonicCheatSheetContainer() {
  let [root, setRoot] = useState<Note>("A");
  let [shape, setShape] = useState<Shape>(1);
  const [dots, setDots] = useState<Position[]>([]);

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
        onChange={(e) => setRoot(e.target.value as Note)}
      />
      <DropDown
        options={Array.from({ length: 5 }, (_, i) => i + 1).map((n) => {
          return { value: String(n), text: String(n) };
        })}
        onChange={(e) => setShape(Number(e.target.value) as Shape)}
      />
      <FretboardComponent dots={dots} showNotes={true} editable={false} />
    </div>
  );
}

export { PentatonicCheatSheetContainer };
