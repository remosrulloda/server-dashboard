import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { HOSTNAME, startContainer, stopContainer, restartContainer, deleteContainer } from './containerActions';

interface ContainerProps {
    id: string;
    containerName: string;
    state: string;
    port?: number;
}

export default function Container(props: ContainerProps) {
    const portLink = props.port ? `http://${HOSTNAME}:${props.port}` : undefined;
    return (
        <Card style={{ width: '14rem' }} className="card">
            <Card.Body>
                <Card.Title ><a href={portLink}>{props.containerName}</a></Card.Title>
                <Card.Text>
                    State: {props.state} <br></br>
                    Port: {props.port}
                </Card.Text>
                <br />
                <Button variant="secondary" onClick={() => stopContainer(props.id)}>Stop</Button>
                <Button variant="success" onClick={() => startContainer(props.id)}>Start</Button>
                <Button variant="info" onClick={() => restartContainer(props.id)}>Restart</Button>
                <Button variant="danger" onClick={() => deleteContainer(props.id)}>Delete</Button>
            </Card.Body>
        </Card >
    );
}