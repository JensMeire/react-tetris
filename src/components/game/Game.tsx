import React, {useCallback} from "react";
import GridComponent from "components/grid/Grid";
import {useGame} from "infrastructure/game/GameContext";
import useEventListener from "infrastructure/utils/useEventListener";

const GameComponent = (): React.ReactElement => {
  const {moveLeft, moveDown, moveRight, rotateRight} = useGame()

  const handleKeyDown = useCallback((event: Event): void => {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent || !keyboardEvent.code) return
    switch (keyboardEvent.code.toLowerCase()) {
      case "arrowup":
        rotateRight();
        break;
      case "arrowdown":
        moveDown();
        break;
      case "arrowleft":
        moveLeft();
        break;
      case "arrowright":
        moveRight();
        break;
    }
  }, [moveLeft, moveDown, moveRight, rotateRight])

  useEventListener("keydown", handleKeyDown);

  return <div>
    <GridComponent/>
  </div>
}
export default GameComponent;