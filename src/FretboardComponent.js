import { useEffect, useRef, useState } from "react";
import { Fretboard } from "@moonwave99/fretboard.js";
import { noteFromPosition } from "./utils";
import { config } from "./config";

function FretboardComponent(props) {
  const { showNotes, dots, editable, onClick } = props;
  const isInitiated = useRef(false);

  const [fretboard, setFretboard] = useState();

  useEffect(() => {
    if (!isInitiated.current) {
      setFretboard(
        new Fretboard({
          el: "#fretboard",
          fretCount: config.fretCount,
          dotText: showNotes ? noteFromPosition : () => "",
        })
      );
      isInitiated.current = true;
    }
  }, [showNotes, fretboard]);
  useEffect(() => {
    if (fretboard) {
      fretboard.clear();
      fretboard.setDots(dots).render();
      fretboard.on("click", editable ? onClick : () => null);
    }
  }, [dots, onClick, editable, fretboard]);
  return <figure id="fretboard"></figure>;
}

export { FretboardComponent };
