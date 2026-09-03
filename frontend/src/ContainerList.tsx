import Container from "./components/Container";
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

const HOSTNAME = window.location.hostname;
const BASE_URL = `http://${HOSTNAME}:3000/api/containers`

function ContainerList() {
    const [containers, setContainers] = useState<DockerContainer[]>([]);
    const fetchLink = BASE_URL;

    useEffect(() => {
        fetch(fetchLink)
            .then(res => res.json())
            .then((data) => {
                setContainers(data);
            })
            .catch((error) => {
                console.error("Error fetching containers: ", error);
            })
    }, [fetchLink]);

    return (
        <div className="containers container-fluid p-4">
            <div className="row g-4">
                {containers.map((container) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={container.Id}>
                        <Container
                            id={container.Id}
                            containerName={(container.Names?.[0] ?? "Untitled").replace(/^\//, "")}
                            state={container.State}
                            port={container.Ports?.[0]?.PublicPort}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContainerList;
