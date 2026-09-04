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
const wsUri = `ws://${HOSTNAME}:3000/api/containers`;

function ContainerList() {
    const [containers, setContainers] = useState<DockerContainer[]>([]);
    useEffect(() => {
        const ws = new WebSocket(wsUri);

        ws.addEventListener('open', () => {
            console.log("connected");
        });

        ws.addEventListener("message", (event) => {
            try {
                const data: DockerContainer[] = JSON.parse(event.data);
                setContainers(data);
            } catch (err) {
                console.error("Failed to parse container payload:", err);
            }
        });

        ws.addEventListener("error", (event) => {
            console.error("WebSocket error:", event);
        });

        ws.addEventListener("close", (event) => {
            if (event.wasClean) {
                console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.log("Connection died");
            }
        });

        return () => {
            ws.close();
        };
    }, []);

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
