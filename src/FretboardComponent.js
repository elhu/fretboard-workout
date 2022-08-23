import { useEffect, useRef } from "react";
import { Fretboard } from "@moonwave99/fretboard.js";
import { noteFromPosition } from "./utils";
import { config } from "./config";

function FretboardComponent({ showNotes, dots, editable, onClick }) {
  const fretboard = useRef(null);
  const fredboardEl = useRef(null);

  useEffect(() => {
    if (!fretboard.current && fredboardEl.current) {
      fretboard.current = new Fretboard({
        el: fredboardEl.current,
        fretCount: config.fretCount,
        dotText: showNotes ? noteFromPosition : () => "",
      });
    }

    return () => {
      fretboard.current.removeEventListeners();
    };
  }, [showNotes, fretboard]);

  useEffect(() => {
    if (fretboard.current) {
      fretboard.current.clear();
      fretboard.current.setDots(dots).render();
      fretboard.current.on("click", editable ? onClick : () => null);
    }
  }, [dots, onClick, editable, fretboard]);

  return <figure id="fretboard" ref={fredboardEl} />;
}

export { FretboardComponent };
