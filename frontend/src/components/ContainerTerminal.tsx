import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import TerminalComponent from "./TerminalComponent";

function ContainerTerminal() {
  return (
    <Popup trigger={<button className="button">Open Terminal</button>} modal>
      <TerminalComponent />
    </Popup>
  );
}

export default ContainerTerminal;
