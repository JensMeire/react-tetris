import React from "react";
import "./App.css";
import Game from "components/game/Game";
import {GameContextProvider} from "infrastructure/game/GameContext";
import TetrisGame from "components/TetrisGame";

function App() {
  return (
    <div className="App">
      <TetrisGame/>
    </div>
  );
}

export default App;
