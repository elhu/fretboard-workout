import "./App.css";
import { PentatonicShapeToNameContainer } from "./exercises/PentatonicShapeToName";

function App() {
  // useEffect(() => {
  //   if (root !== undefined && shape !== undefined) {
  //     setDots(minorPentatonicShapesFor({ root, shape }).flat());
  //   }
  // }, [shape, root]);

  // const onFretboardClick = ({ fret, string }) => {
  //   const idx = dots.findIndex((x) => x.fret === fret && x.string === string);
  //   if (idx == -1) {
  //     dots = dots.concat([{ fret: fret, string: string }]);
  //     setDots(dots);
  //   } else {
  //     dots = dots.slice(0, idx).concat(dots.slice(idx + 1, dots.length));
  //     setDots(dots);
  //   }
  // };

  return (
    <div className="App">
      <PentatonicShapeToNameContainer />
    </div>
  );
}

export default App;
