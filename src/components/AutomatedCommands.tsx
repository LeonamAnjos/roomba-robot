import { ComponentChildren } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { RoombaContext, RoombaState } from "../context/RoombaContext";

const clean = (roomba: RoombaState) => {
  return setTimeout(() => {
    if (Math.random() < 0.8) {
      roomba.moveForward();
    } else {
      roomba.rotate();
    }
  }, 1000);
};

const moveToDock = (roomba: RoombaState) => {
  if (roomba.isAt({ x: 1, y: 1 })) {
    roomba.setRobotStatus("Charging");
    return undefined;
  }

  return setTimeout(() => {
    roomba.moveForward();
  }, 500);
};

interface CommandButtonProps {
  onClick?: () => void | undefined;
  disabled?: boolean | undefined;
  children?: ComponentChildren | undefined;
}

const CommandButton = ({ onClick, disabled, children }: CommandButtonProps) => {
  return (
    <div class="row">
      <button
        class="command"
        disabled={disabled}
        onClick={() => onClick && onClick()}
      >
        {children}
      </button>
    </div>
  );
};

const AutomatedCommands = () => {
  const roomba = useContext(RoombaContext);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;

    switch (roomba.getRobotStatus()) {
      case "Cleaning":
        timer = clean(roomba);
        break;
      case "Moving to the dock":
        timer = moveToDock(roomba);
        break;
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [roomba]);

  const onStartClickHandle = (): void => {
    roomba.setRobotStatus("Cleaning");
  };

  const onStopClickHandle = (): void => {
    roomba.setRobotStatus("Moving to the dock");
  };

  const onPauseClickHandle = (): void => {
    roomba.setRobotStatus("Paused");
  };

  const onResumeClickHandle = (): void => {
    roomba.setRobotStatus("Cleaning");
  };

  switch (roomba.getRobotStatus()) {
    case "Cleaning":
      return (
        <CommandButton onClick={onPauseClickHandle}>⏸️ Pause</CommandButton>
      );
    case "Paused":
      return (
        <>
          <CommandButton onClick={() => onResumeClickHandle()}>
            ⏯️ Resume
          </CommandButton>
          <CommandButton onClick={() => onStopClickHandle()}>
            ⏹️ Stop cleaning
          </CommandButton>
        </>
      );
    case "Moving to the dock":
      return (
        <CommandButton disabled={true}>⏫ Moving to the dock...</CommandButton>
      );
    default:
      return (
        <CommandButton onClick={onStartClickHandle}>
          ▶️ Start cleaning
        </CommandButton>
      );
  }
};

export { AutomatedCommands };
