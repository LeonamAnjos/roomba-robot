import { AutomatedCommands } from "./components/AutomatedCommands";
import { ManualCommands } from "./components/ManualCommands";
import { Room } from "./components/Room";
import { RoombaContextProvider } from "./context/RoombaContext";
import "./Room.css";

export function App() {
  const size = 5;

  return (
    <RoombaContextProvider size={size}>
      <div class="container">
        <Room size={size}></Room>
      </div>
      <div class="container">
        <ManualCommands />
        <AutomatedCommands />
      </div>
    </RoombaContextProvider>
  );
}
