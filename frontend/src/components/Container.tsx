import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import toast from "react-hot-toast";

interface ContainerProps {
    id: string;
    containerName: string;
    state: string;
    port?: number;
}

const HOSTNAME = window.location.hostname;
const BASE_URL = `http://${HOSTNAME}:3000/api/containers`

function Container({ id, containerName, state, port }: ContainerProps) {
    const portLink = port ? `http://${HOSTNAME}:${port}` : undefined;
    return (
        <Card style={{ width: '14rem' }}>
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

async function startContainer(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/${id}/start`, { method: 'POST' });
        const data = await response.json();

        if (!data) {
            toast.error(`Failed to start container ${data.container.name}`);
        } else {
            toast.success(`Container "${data.container.name}" started`);
        }
        return data;
    } catch (err) {
        console.error("Error starting container:", err);
    }

}

async function stopContainer(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/${id}/stop`, { method: 'POST' });
        const data = await response.json();

        if (!data) {
            toast.error(`Failed to stop container ${data.container.name}`);
        } else {
            toast.success(`Container "${data.container.name}" stopped`);
        }
    } catch (err) {
        console.error("Error stopping container:", err)
    }

}

async function restartContainer(id: string) {
    try {
        const restartPromise = (async () => {
            const response = await fetch(`${BASE_URL}/${id}/restart`, { method: 'POST' });

            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }

            return await response.json();
        })();

        toast.promise(restartPromise, {
            loading: 'Restarting container...',
            success: (data) => `Successfully restarted container ${data?.container?.name ?? id}`,
            error: (err) => `Failed to restarted container: ${err.message}`
        }
        );

    } catch (err) {
        console.error("Error restarting container:", err);
    }
}

function deleteContainer(id: string) {
    const deletePromise = (async () => {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData || `Server returned status ${response.status}`);
        }

        return await response.json();
    })();

    toast.promise(deletePromise, {
        loading: 'Deleting container...',
        success: (data) => `Successfully deleted container ${data?.container?.name ?? id}`,
        error: (err) => `Failed to delete container: ${err.message}`
    }
    );
}


export default Container;