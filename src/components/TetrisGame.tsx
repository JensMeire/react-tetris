import GameHandler from "infrastructure/game/GameHandler";
import GameEventEmitter from "infrastructure/events/GameEventEmitter";
import {BoardModule} from "infrastructure/modules/Board/BoardModule";
import PlayableShapeModule from "infrastructure/modules/PlayableShape/PlayableShapeModule";
import {CollisionDetector} from "infrastructure/modules/CollisionDetector/CollisionDetector";
import SettingsModule from "infrastructure/modules/Settings/SettingsModule";
import {GameActions} from "infrastructure/game/GameActions";
import {IBoardSettings} from "infrastructure/modules/Settings/ISettingsModule";
import ShapeQueueModule from "infrastructure/modules/ShapeQueue/ShapeQueueModule";
import IBoardModule, {Grid} from "infrastructure/modules/Board/IBoardModule";
import GridRow from "components/gridrow/GridRow";
import Cell from "components/cell/Cell";
import React, {useEffect, useState} from "react";

const TetrisGame = () => {
  const emitter = new GameEventEmitter();
  const playableShapeModule = new PlayableShapeModule(emitter);
  const collisionDetector = new CollisionDetector();
  const boardModule = new BoardModule(emitter, playableShapeModule, collisionDetector);
  const bindings = {
    [GameActions.RotateRight]: "e",
    [GameActions.RotateLeft]: "q",
    [GameActions.MoveLeft]: "a",
    [GameActions.MoveRight]: "d",
    [GameActions.MoveDown]: "s",
  };
  const settings = {
    height: 40,
    width: 20
  } as IBoardSettings;
  const settingsModule = new SettingsModule(emitter, bindings, settings);
  const shapeQueue = new ShapeQueueModule(emitter);
  const gameHandler = new GameHandler(emitter, boardModule, playableShapeModule, settingsModule, shapeQueue);
  gameHandler.startGame();

  return <BoardComponent boardModule={boardModule}/>
}

const BoardComponent = ({boardModule}: { boardModule: IBoardModule }) => {
  const [grid, setGrid] = useState<Grid>();
  useEffect(() => {
    boardModule.subscribeBoardChanged(setGrid);
  }, [])
  return (<>{grid?.map((r
    , i) => (
    <GridRow key={`row-${i}`}>
      {r.map((c, j) => (
        <Cell color={c} key={`cell-${i}-${j}`}></Cell>
      ))}
    </GridRow>)
  )}</>)
}

export default TetrisGame;