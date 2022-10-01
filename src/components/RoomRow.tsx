import { ComponentChildren } from "preact";

interface RoomRowProps {
  children: ComponentChildren;
}

const RoomRow = ({ children }: RoomRowProps) => {
  return <div class={"row"}>{children}</div>;
};

export { RoomRow };
