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
    containerName: string;
    state: string;
    port?: number;
}

function Container({ containerName, state, port }: ContainerProps) {
    const hostname = window.location.hostname;
    const portLink = port ? `http://${hostname}:${port}` : undefined;

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
                <Button variant="secondary" >Stop</Button>
                <Button variant="info" >Restart</Button>
                <Button variant="danger" >Delete</Button>
            </Card.Body>
        </Card >
    );
}



// function startContainer() {


// }

// function stopContainer() {


// }

// function restartContainer() {


// }

// function pauseContainer() {


// }

// function deleteContainer() {


// }

function Containers() {
    const [containers, setContainers] = useState<DockerContainer[]>([]);
    const hostname = window.location.hostname;
    const port = 3000;

    const fetchLink = `http://${hostname}:${port}/api/containers`;

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
        <div className="containers container-fluid p-4">
            <div className="row g-4">
                {containers.map((container) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={container.Id}>
                        <Container
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