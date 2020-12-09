import React from "react";
import "./App.css";
import Game from "components/game/Game";
import {GameContextProvider} from "infrastructure/game/GameContext";

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Game/>
      </GameContextProvider>
    </div>
  );
}

export default App;
