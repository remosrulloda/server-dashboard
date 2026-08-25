import { useState, useEffect } from "react";

interface DockerPort {
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
}

interface DockerContainer {
  Id: string;
  Names: string[];
  State: string;
  Ports: DockerPort[];
}

interface ContainerProps {
  containerName: string;
  state: string;
  port?: number;
}

function Container({ containerName, state, port }: ContainerProps) {
  const hostname = window.location.hostname;
  const portLink = port ? `http://${hostname}:${port}` : undefined;

  return (
    <div className="container">
      <h2>{containerName}</h2>
      <h3>State: {state}</h3>
      <h4>Port: {port}</h4>
      <a href={portLink}>Link</a>
    </div >
  );
}

function Containers() {
  const [containers, setContainers] = useState<DockerContainer[]>([]);
  const hostname = window.location.hostname;
  const port = 3030;

  const fetchLink = `http://${hostname}:${port}/containers`;

  useEffect(() => {
    fetch(fetchLink)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setContainers(data);
      })
      .catch((error) => {
        console.error("Error fetching containers: ", error);
      })
  }, []);

  return (
    <div className="containers">
      {containers.map((container) => (
        <Container
          key={container.Id}
          containerName={container.Names?.[0] ?? "Unnamed Container"}
          state={container.State}
          port={container.Ports?.[0].PublicPort}
        />
      ))}
    </div>
  );
}


function App() {
  return (
    <>
      <h2>Containers</h2>
      <Containers />

    </>
  )
}

export default App;
