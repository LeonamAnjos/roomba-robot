import { useContext } from "preact/hooks";
import { RoombaContext } from "../context/RoombaContext";

const ManualCommands = () => {
  const roomba = useContext(RoombaContext);

  const disabled = roomba.getRobotStatus() !== "Charging";

  const moveFowardHandle = () => roomba.moveForward();
  const rotateHandle = () => roomba.rotate();

  return (
    <>
      <div class="row">
        <button class="command" disabled={disabled} onClick={moveFowardHandle}>
          ⏩ Move Foward
        </button>
      </div>
      <div class="row">
        <button class="command" disabled={disabled} onClick={rotateHandle}>
          🔁 Rotate
        </button>
      </div>
    </>
  );
};

export { ManualCommands };
