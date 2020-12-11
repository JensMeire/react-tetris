import React from "react";
import GridRow from "components/gridrow/GridRow";
import Cell from "components/cell/Cell";
import {useGame} from "infrastructure/game/GameContext";

const GridComponent = (): React.ReactElement => {
  const {grid, getColor, moveLeft, moveDown, moveRight, rotateRight, rotateLeft, startNewGame} = useGame()
  return <div>
    <div>
      {grid.map((r, i) => (
        <GridRow key={`row-${i}`}>
          {r.map((c, j) => (
            <Cell color={getColor(j, i)} key={`cell-${i}-${j}`}></Cell>
          ))}
        </GridRow>)
      )}
    </div>
    <div>
      <button onClick={() => moveLeft()}>
        left
      </button>

      <button onClick={() => moveDown()}>
        down
      </button>

      <button onClick={() => moveRight()}>
       right
      </button>
      <button onClick={() => rotateLeft()}>
        rotate left
      </button>
      <button onClick={() => rotateRight()}>
        rotate right
      </button>
      <button onClick={() => startNewGame()}>
        new game
      </button>
    </div>
  </div>;
}

export default GridComponent;