import { useEffect, useRef } from "react";
import { Fretboard, Position } from "@moonwave99/fretboard.js";
import { noteFromPosition } from "./utils";
import { config } from "./config";
import { FretboardHandler } from "./types";

interface Props {
  showNotes: boolean;
  dots: Position[];
  editable: boolean;
  onClick?: FretboardHandler;
}

export const FretboardComponent = ({
  showNotes,
  dots,
  editable,
  onClick,
}: Props) => {
  const fretboard = useRef<Fretboard | null>(null);
  const fredboardEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!fretboard.current && fredboardEl.current) {
      fretboard.current = new Fretboard({
        el: fredboardEl.current,
        fretCount: config.fretCount,
        dotText: showNotes ? noteFromPosition : () => "",
      });
    }

    return () => {
      fretboard.current?.removeEventListeners();
    };
  }, [showNotes, fretboard]);

  useEffect(() => {
    if (fretboard.current) {
      fretboard.current.clear();
      fretboard.current.setDots(dots).render();
      fretboard.current.on("click", editable && onClick ? onClick : () => null);
    }
  }, [dots, onClick, editable, fretboard]);

  return <figure id="fretboard" ref={fredboardEl} />;
};
