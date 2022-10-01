import { ComponentChildren } from "preact";
import "./Room.css";

interface Coordinates {
  x: number;
  y: number;
}

type CellContent = "👉" | "👇" | "👈" | "👆" | "";

const getCellContent = (coordinates: Coordinates): CellContent => {
  const robotPosition = { x: 1, y: 1 };

  if (coordinates.x !== robotPosition.x) return "";
  if (coordinates.y !== robotPosition.y) return "";

  return "👉";
};

interface RoomCellProps {
  position: Coordinates;
}

const RoomCell = ({ position }: RoomCellProps) => {
  const content = getCellContent(position);

  return <div class={"item"}>{content}</div>;
};

interface RoomRowProps {
  children: ComponentChildren;
}

const RoomRow = ({ children }: RoomRowProps) => {
  return <div class={"row"}>{children}</div>;
};

interface RoomProps {
  size: number;
}

const Room = ({ size }: RoomProps) => {
  const rows = [];
  for (let i = 1; i <= size; i++) {
    const cells = [];
    for (let j = 1; j <= size; j++) {
      cells.push(<RoomCell position={{ x: j, y: i }} />);
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

export function App() {
  return (
    <div class={"container"}>
      <Room size={10}></Room>
    </div>
  );
}
