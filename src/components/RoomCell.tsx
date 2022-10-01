import { useContext } from "preact/hooks";
import { RoombaContext } from "../context/RoombaContext";
import { Coordinates } from "../model/coordinate";

interface RoomCellProps {
  position: Coordinates;
}

const RoomCell = ({ position }: RoomCellProps) => {
  const robot = useContext(RoombaContext);

  const content = robot.isAt(position) ? robot.robotPicture() : "";

  return <div class={"item"}>{content}</div>;
};

export { RoomCell };
