import { useEffect } from "react";
import { Fretboard } from "@moonwave99/fretboard.js";
import { noteFromPosition } from "./utils";
import { config } from "./config";

let fretboard;

function FretboardComponent(props) {
  const { showNotes, dots, editable, onClick } = props;
  useEffect(() => {
    fretboard = new Fretboard({
      el: "#fretboard",
      fretCount: config.fretCount,
      dotText: showNotes ? noteFromPosition : () => "",
    });
  }, [showNotes]);
  useEffect(() => {
    fretboard.clear();
    fretboard.setDots(dots).render();
    fretboard.on("click", editable ? onClick : () => null);
  }, [dots, onClick, editable]);
  return <figure id="fretboard"></figure>;
}

export { FretboardComponent };
