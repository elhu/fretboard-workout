import { get as getScale } from "@tonaljs/scale";
import { config } from "./config";
import { Note, NoteOnString, PentatonicRootShape, PentatonicShape } from "./types";

const fretboardNotes = ["E2", "A2", "D3", "G3", "B3", "E4"]
  .reverse()
  .map((note) => {
    const [noteName, octave] = note.split("");
    return [
      ...getScale(`${note} chromatic`).notes,
      ...getScale(`${noteName}${+octave + 1} chromatic`).notes,
    ];
  });

function noteFromPosition({ string, fret }: { string: number; fret: number }) {
  return fretboardNotes[string - 1][fret].slice(0, -1);
}

const minorPentatonicShapes: Record<PentatonicShape, NoteOnString[]> = {
  1: [
    { string: 6, fret: 0 },
    { string: 6, fret: 3 },
    { string: 5, fret: 0 },
    { string: 5, fret: 2 },
    { string: 4, fret: 0 },
    { string: 4, fret: 2 },
    { string: 3, fret: 0 },
    { string: 3, fret: 2 },
    { string: 2, fret: 0 },
    { string: 2, fret: 3 },
    { string: 1, fret: 0 },
    { string: 1, fret: 3 },
  ],
  2: [
    { string: 6, fret: 3 },
    { string: 6, fret: 5 },
    { string: 5, fret: 2 },
    { string: 5, fret: 5 },
    { string: 4, fret: 2 },
    { string: 4, fret: 5 },
    { string: 3, fret: 2 },
    { string: 3, fret: 4 },
    { string: 2, fret: 3 },
    { string: 2, fret: 5 },
    { string: 1, fret: 3 },
    { string: 1, fret: 5 },
  ],
  3: [
    { string: 6, fret: 5 },
    { string: 6, fret: 7 },
    { string: 5, fret: 5 },
    { string: 5, fret: 7 },
    { string: 4, fret: 5 },
    { string: 4, fret: 7 },
    { string: 3, fret: 4 },
    { string: 3, fret: 7 },
    { string: 2, fret: 5 },
    { string: 2, fret: 8 },
    { string: 1, fret: 5 },
    { string: 1, fret: 7 },
  ],
  4: [
    { string: 6, fret: 7 },
    { string: 6, fret: 10 },
    { string: 5, fret: 7 },
    { string: 5, fret: 10 },
    { string: 4, fret: 7 },
    { string: 4, fret: 9 },
    { string: 3, fret: 7 },
    { string: 3, fret: 9 },
    { string: 2, fret: 8 },
    { string: 2, fret: 10 },
    { string: 1, fret: 7 },
    { string: 1, fret: 10 },
  ],
  5: [
    { string: 6, fret: 10 },
    { string: 6, fret: 12 },
    { string: 5, fret: 10 },
    { string: 5, fret: 12 },
    { string: 4, fret: 9 },
    { string: 4, fret: 12 },
    { string: 3, fret: 9 },
    { string: 3, fret: 12 },
    { string: 2, fret: 10 },
    { string: 2, fret: 12 },
    { string: 1, fret: 10 },
    { string: 1, fret: 12 },
  ],
};

const notes: Note[] = [
  "A",
  "Bb",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
];

const rootOffset: Record<Note, number> = {
  E: 0,
  F: 1,
  "F#": 2,
  G: 3,
  Ab: 4,
  A: 5,
  Bb: 6,
  B: 7,
  C: 8,
  "C#": 9,
  D: 10,
  "D#": 11,
};

function minorPentatonicShapesFor({
  shape,
  root,
}: PentatonicRootShape): NoteOnString[][] {
  const offsets = [
    rootOffset[root] - 12,
    rootOffset[root],
    rootOffset[root] + 12,
  ];
  const notes: NoteOnString[][] = offsets
    .map((offset) => {
      return minorPentatonicShapes[shape].map(({ string, fret }) => {
        return { string: string, fret: fret + offset };
      });
    })
    .filter(
      (shape) =>
        !shape.some(({ string, fret }) => fret < 0 || fret > config.fretCount)
    );
  return notes;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomRoot() {
  return notes[getRandomInt(notes.length)];
}

export function randomShape(): PentatonicShape {
  return (getRandomInt(5) + 1) as PentatonicShape;
}

export { noteFromPosition, minorPentatonicShapesFor, notes };
