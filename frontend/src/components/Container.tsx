import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

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
    id: string;
    containerName: string;
    state: string;
    port?: number;
}
const HOSTNAME = window.location.hostname;
const API_BASE = `http://${HOSTNAME}:3000/api/containers`

function Container({ id, containerName, state, port }: ContainerProps) {
    const portLink = port ? `http://${HOSTNAME}:${port}` : undefined;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{containerName}</Card.Title>
                <Card.Text>
                    State: {state} <br></br>
                    Port: {port}
                </Card.Text>
                <Button variant="primary" href={portLink} disabled={!portLink}>Link</Button>
                <br />
                <Button variant="secondary" onClick={() => stopContainer(id)}>Stop</Button>
                <Button variant="success" onClick={() => startContainer(id)}>Start</Button>
                <Button variant="info" onClick={() => restartContainer(id)}>Restart</Button>
                <Button variant="danger" onClick={() => deleteContainer(id)}>Delete</Button>
            </Card.Body>
        </Card >
    );
}

// TODO: Compose functions together
function startContainer(id: string) {
    fetch(`${API_BASE}/${id}/start`, { method: 'POST' })
        .then((data) => console.log(data))
        .catch((err) => console.error("Error starting container:", err));
}

function stopContainer(id: string) {
    fetch(`${API_BASE}/${id}/stop`, { method: 'POST' })
        .then((data) => console.log(data))
        .catch((err) => console.error("Error stopping container:", err));
}

function restartContainer(id: string) {
    fetch(`${API_BASE}/${id}/restart`, { method: 'POST' })
        .then((data) => console.log(data))
        .catch((err) => console.error("Error restarting container:", err));
}

function deleteContainer(id: string) {
    fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
        .then((data) => console.log(data))
        .catch((err) => console.error("Error deleting container:", err));
}

function Containers() {
    const [containers, setContainers] = useState<DockerContainer[]>([]);
    const fetchLink = API_BASE;

    useEffect(() => {
        fetch(fetchLink)
            .then(res => res.json())
            .then((data) => {
                setContainers(data);
            })
            .catch((error) => {
                console.error("Error fetching containers: ", error);
            })
    }, [containers, fetchLink]);

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

export default Containers;