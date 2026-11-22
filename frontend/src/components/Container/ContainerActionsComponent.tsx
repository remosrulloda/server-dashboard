import {
  startContainer,
  stopContainer,
  restartContainer,
  deleteContainer,
  getInfo,
} from "./containerActions";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "reactjs-popup";
import TerminalComponent from "../TerminalComponent";
import { useState } from "react";
interface ContainerActionsProps {
  id: string;
  state: string;
}

function ContainerActions({ id, state }: ContainerActionsProps) {
  const currentState = state === "running";
  const [isOn, setIsOn] = useState(currentState);

  function handleToggle() {
    if (isOn) {
      stopContainer(id);
    } else {
      startContainer(id);
    }
    setIsOn(!isOn);
  }

  return (
    <div className="containerActions">
      <button onClick={() => getInfo(id)}>INFO</button>
      <button onClick={handleToggle}>
        {isOn ? "Stop Container" : "Start Container"}
      </button>
      <button onClick={() => restartContainer(id)}>restart container</button>
    </div>
  );
}

export default ContainerActions;
