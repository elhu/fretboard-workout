import { useEffect } from "react";
import { Fretboard } from "@moonwave99/fretboard.js";
import { noteFromPosition } from "./utils";
import { config } from "./config";

let fretboard;

function FretboardComponent(props) {
  const dots = props.dots;
  useEffect(() => {
    fretboard = new Fretboard({
      el: "#fretboard",
      fretCount: config.fretCount,
      dotText: noteFromPosition,
    });
  }, []);
  useEffect(() => {
    fretboard.clear();
    fretboard.setDots(dots).render();

    fretboard.on("click", props.onClick);
  }, [dots]);
  return <figure id="fretboard"></figure>;
}

export { FretboardComponent };
