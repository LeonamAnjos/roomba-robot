import { useContext } from "preact/hooks";
import { RoombaContext } from "../context/RoombaContext";

const ManualCommands = () => {
  const roomba = useContext(RoombaContext);

  const moveFowardHandle = () => roomba.moveForward();
  const rotateHandle = () => roomba.rotate();

  return (
    <>
      <div class="row">
        <button class="command" onClick={moveFowardHandle}>
          ⏩ Move Foward
        </button>
      </div>
      <div class="row">
        <button class="command" onClick={rotateHandle}>
          🔁 Rotate
        </button>
      </div>
    </>
  );
};

export { ManualCommands };
