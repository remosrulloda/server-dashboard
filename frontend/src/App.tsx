import { useState, useEffect } from "react";
import Container from "./components/Container";

interface ContainerData {
  id: number;
  containerName: string,
  status: string,
  port: number,
  link: string
}

function Containers() {
  const [containers, setContainers] = useState<ContainerData[]>([]);

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

    </div>
  );
}


function App() {
  return (
    <>
      <p>test</p>
      <Containers />

    </>
  )
}

export default App;
