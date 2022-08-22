import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PentatonicNameToShapeContainer } from "./exercises/PentatonicNameToShape";
import { PentatonicShapeToNameContainer } from "./exercises/PentatonicShapeToName";

function App() {
  return (
    <div className="App">
      <div class="sidenav">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
      </div>{" "}
      <div class="main">
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
