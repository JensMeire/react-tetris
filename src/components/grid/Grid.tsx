import React, {useState} from "react";
import GridRow from "components/gridrow/GridRow";
import Cell from "components/cell/Cell";
import getRandomShape from "infrastructure/shape/ShapeFactory";
import {useGame} from "infrastructure/game/GameContext";

const GridComponent = (): React.ReactElement => {
  const {grid, getColor, initializeNewShape} = useGame()
  console.log("")
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
      <button onClick={() => initializeNewShape()}>
        Spwan
      </button>
    </div>
  </div>;
}

export default GridComponent;