import express, { type Express, type Request, type Response } from 'express';
import Docker from 'dockerode';
import cors from 'cors';

const app: Express = express();
app.use(cors());

const port = 3000;
const isMac = process.platform === 'darwin';

const socketPath = process.env.DOCKER_SOCKET_PATH || (
    isMac ? `${process.env.HOME}/.docker/run/docker.sock` : '/var/run/docker.sock'
);

const docker = new Docker({ socketPath });

app.get('/', (req: Request, res: Response) => {
    res.send('');
});

// Gets all containers
app.get('/api/containers', async (req: Request, res: Response) => {
    try {
        const containers = await docker.listContainers({ all: true });
        res.json(containers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch docker containers' });
    }
});

// Starts container
app.post('/api/containers/:id/start', async (req: Request, res: Response) => {
    try {
        const container = docker.getContainer(req.params.id);
        const data = await container.inspect();
        if (!data.State.Running) {
            await container.start();
        }
        res.json({ message: `Container ${req.params.id} started successfully` });
    } catch (err: any) {
        console.error(err);
        if (err.statusCode === 404) {
            return res.status(404).json({ error: 'Container ID does not exist' });
        }
        res.status(500).json({ error: "Failed to start container" });
    }
});

// Stops container
app.post('/api/containers/:id/stop', async (req: Request, res: Response) => {
    try {
        const container = docker.getContainer(req.params.id);
        const data = await container.inspect();
        if (data.State.Running) {
            await container.stop();
        }
        res.json({ message: `Container ${req.params.id} stopped successfully` });
    } catch (err: any) {
        console.error(err);
        if (err.statusCode === 404) {
            return res.status(404).json({ error: 'Container ID does not exist' });
        }
        res.status(500).json({ error: "Failed to stop container" });
    }
});

// Restarts container
app.post('/api/containers/:id/restart', async (req: Request, res: Response) => {
    try {
        const container = docker.getContainer(req.params.id);
        await container.restart({ t: 10 });
        res.json({ message: `Container ${req.params.id} restarted successfully` });
    } catch (err: any) {
        console.error(err);
        if (err.statusCode === 404) {
            return res.status(404).json({ error: 'Container ID does not exist' });
        }
        res.status(500).json({ error: "Failed to restart container" });
    }
});

// Deletes container
app.delete('/api/containers/:id', async (req: Request, res: Response) => {
    try {
        const container = docker.getContainer(req.params.id);
        await container.remove();
        res.json({ message: `Container ${req.params.id} deleted successfully` });
    } catch (err: any) {
        console.error(err);
        if (err.statusCode === 404) {
            return res.status(404).json({ error: 'Container ID does not exist' });
        }
        res.status(500).json({ error: "Failed to delete container" });
    }
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 