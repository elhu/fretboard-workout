import { useEffect, useRef } from "react";
import { Fretboard } from "@moonwave99/fretboard.js";
import { noteFromPosition } from "./utils";
import { config } from "./config";

function FretboardComponent({ showNotes, dots, editable, onClick }) {
  const fretboard = useRef(null);
  const fredboardEl = useRef(null);

  useEffect(() => {
    console.log("called on mount");

    if (!fretboard.current && fredboardEl.current) {
      console.log("called on mount: should work once");
      fretboard.current = new Fretboard({
        el: fredboardEl.current,
        fretCount: config.fretCount,
        dotText: showNotes ? noteFromPosition : () => "",
      });
    }

    return () => {
      console.log("called on unmount");
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
