import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { PentatonicNameToShapeContainer } from "./exercises/PentatonicNameToShape";
import { PentatonicShapeToNameContainer } from "./exercises/PentatonicShapeToName";

function App() {
  return (
    <div className="App">
      <div className="sidenav">
        <Link to="/pentatonic-shape-to-name">Pentatonic shape to key</Link>
        <Link to="/pentatonic-name-to-shape">Pentatonic key to shape</Link>
      </div>{" "}
      <div className="main">
        <Routes>
          <Route path="/" element={<PentatonicShapeToNameContainer />} />
          <Route
            path="/pentatonic-shape-to-name"
            element={<PentatonicShapeToNameContainer />}
          />
          <Route
            path="/pentatonic-name-to-shape"
            element={<PentatonicNameToShapeContainer />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
