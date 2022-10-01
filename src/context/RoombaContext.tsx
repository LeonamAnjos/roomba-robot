import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";
import { Coordinates } from "../model/coordinate";
import { Direction } from "../model/direction";

type RobotImage = "👉" | "👇" | "👈" | "👆" | "";

const RoombaContext = createContext<RoombaState>({
  isAt: (): boolean => false,
  robotPicture: (): RobotImage => "",
  rotate: (): void => {
    /* EMPTY */
  },
  moveForward: (): void => {
    /* EMPTY */
  },
});

interface RoombaContextProviderProps {
  children?: ComponentChildren;
  size: number;
}

interface RoombaState {
  isAt: ({ x, y }: Coordinates) => boolean;
  robotPicture: () => RobotImage;
  rotate: () => void;
  moveForward: () => void;
}

const RoombaContextProvider = ({
  size,
  children,
}: RoombaContextProviderProps) => {
  const [position, setPosition] = useState<Coordinates>({ x: 1, y: 1 });
  const [direction, setDirection] = useState<Direction>(Direction.EAST);

  const state: RoombaState = {
    isAt: ({ x, y }: Coordinates): boolean => {
      return position.x == x && position.y === y;
    },

    robotPicture: (): RobotImage => {
      switch (direction) {
        case Direction.EAST:
          return "👉";
        case Direction.SOUTH:
          return "👇";
        case Direction.WEST:
          return "👈";
        case Direction.NORTH:
          return "👆";
        default:
          return "";
      }
    },

    rotate(): void {
      setDirection((prev) => (prev < 4 ? prev + 1 : 1));
    },

    moveForward(): void {
      const edgeOfTheRoomReached = ({ x, y }: Coordinates): boolean => {
        const min = Math.min(x, y);
        const max = Math.max(x, y);
        return min < 1 || max > size;
      };

      const movement = [Direction.EAST, Direction.SOUTH].includes(direction)
        ? 1
        : -1;

      const newPosition = {
        x: [Direction.EAST, Direction.WEST].includes(direction)
          ? position.x + movement
          : position.x,
        y: [Direction.NORTH, Direction.SOUTH].includes(direction)
          ? position.y + movement
          : position.y,
      };

      if (edgeOfTheRoomReached(newPosition)) {
        this.rotate();
      } else {
        setPosition(newPosition);
      }
    },
  };

  return (
    <RoombaContext.Provider value={state}>{children}</RoombaContext.Provider>
  );
};

export { RoombaContextProvider, RoombaContext };
