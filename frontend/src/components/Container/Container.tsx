import "./container.css";
import { HOSTNAME } from "./containerActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import ContainerActions from "./ContainerActionsComponent";
import ContainerTerminal from "../ContainerTerminal";

library.add(fas);

interface ContainerProps {
  id: string;
  containerName: string;
  state: string;
  port?: number;
  portLink: string;
}

export default function Container(props: ContainerProps) {
  const portLink = props.port ? `http://${HOSTNAME}:${props.port}` : undefined;

  return (
    <div className="container">
      {/* <img src="" alt="" /> */}
      <h1>{props.containerName}</h1>
      <h3>State: {props.state}</h3>
      <h3>Port: {props.port}</h3>
      <button>
        <a href={portLink}>Open</a>
      </button>
      <ContainerActions id={props.id} state={props.state} />
      <ContainerTerminal />
    </div>
  );
}
