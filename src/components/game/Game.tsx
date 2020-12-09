import React from "react";
import Game from "infrastructure/game/Game";
import GridComponent from "components/grid/Grid";

const GameComponent = (): React.ReactElement => {
  const game = new Game();
  return <div>
    <GridComponent/>
  </div>
}
export default GameComponent;