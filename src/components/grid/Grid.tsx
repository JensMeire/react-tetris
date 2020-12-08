import React, {useState} from "react";
import Grid from "infrastructure/grid/Grid"
import GridRow from "components/gridrow/GridRow";
import Cell from "components/cell/Cell";
import getRandomShape from "infrastructure/shape/ShapeFactory";

interface IProps {
  grid: Grid
}


const GridComponent = (props: IProps): React.ReactElement => {
  const [grid, setGrid] = useState(props.grid);
  const playfield = grid.getPlayField();
  console.log("")
  return <div>
    <div>
      {playfield.map((r, i) => (
        <GridRow key={`row-${i}`}>
          {r.map((c, j) => (
            <Cell color={grid.getColor(j,i)} key={`cell-${i}-${j}`}></Cell>
          ))}
        </GridRow>)
      )}
    </div>
    <div>
      <button onClick={() => grid.setNewCurrentShape(getRandomShape())}>
        Spwan
      </button>
    </div>
  </div>;
}

export default GridComponent;