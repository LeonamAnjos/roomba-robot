import { useState } from "preact/hooks";
import { AutomatedCommands } from "./components/AutomatedCommands";
import { ManualCommands } from "./components/ManualCommands";
import { Room } from "./components/Room";
import { RoombaContextProvider } from "./context/RoombaContext";
import "./Room.css";

interface SizeFormProps {
  initialSize: number;
  onSubmit?: (size: number) => void;
}

const SizeForm = ({ initialSize, onSubmit }: SizeFormProps) => {
  const [size, setSize] = useState(initialSize);

  const sizeChangeHandler = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    setSize(+event.currentTarget.value);
  };

  const submitHandler = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();
    onSubmit && onSubmit(size);
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        Size:
        <input
          type="number"
          name="size"
          value={size}
          onChange={sizeChangeHandler}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export function App() {
  const [size, setSize] = useState(5);

  return (
    <RoombaContextProvider size={size}>
      <div class="container">
        <SizeForm initialSize={size} onSubmit={setSize}></SizeForm>
      </div>
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
