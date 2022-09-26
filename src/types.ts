import { Position } from "@moonwave99/fretboard.js";

export type PentatonicShape = 1 | 2 | 3 | 4 | 5;
export type Note =
  | "A"
  | "Bb"
  | "B"
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "Ab";

export type PentatonicRootShape = {
  shape: PentatonicShape;
  root: Note;
};

export type NoteOnString = {
  string: number;
  fret: number;
};

// duplicated from original package since it's not exported
export type FretboardHandler = (position: Position, event: MouseEvent) => void;

export type WinState = "idle" | "won" | "lost";
