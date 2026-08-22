import { useState, useEffect } from "react";

interface DockerContainer {
  Id: string;
  Names: string[];
  State: string;
  Ports: { PublicPort: undefined }[];
}

interface ContainerProps {
  containerName: string,
  state: string,
  port: undefined,
}

function Container({ containerName, state, port }: ContainerProps) {
  const portLink = `http://localhost:${port}`;

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

  useEffect(() => {
    fetch("http://localhost:3000/containers")
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
          containerName={container.Names?.[0]}
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
