import { RoomCell } from "./RoomCell";
import { RoomRow } from "./RoomRow";

interface RoomProps {
  size: number;
}

const Room = ({ size }: RoomProps) => {
  const rows = [];
  for (let i = 1; i <= size; i++) {
    const cells = [];
    for (let j = 1; j <= size; j++) {
      cells.push(<RoomCell position={{ x: i, y: j }} />);
    }
    rows.push(<RoomRow>{cells}</RoomRow>);
  }

  return (
    <>
      <span>{`${size} x ${size}`} </span>

      <div class={"grid"}>{rows}</div>
    </>
  );
};

export { Room };
