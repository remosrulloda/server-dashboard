import express, { type Express, type Request, type Response } from 'express';
import Docker from 'dockerode';
import cors from 'cors';

const app: Express = express();
app.use(cors());

const port = 3000;

const isMac = process.platform === 'darwin';

const socketPath = process.env.DOCKER_SOCKET_PATH || (
    isMac ? `${process.env.HOME}/.dockerrun/docker.sock` : '/var/run/docker.sock'
);

const docker = new Docker({ socketPath });

app.get('/', (req: Request, res: Response) => {
    res.send('');
});

app.get('/containers', async (req: Request, res: Response) => {
    try {
        const containers = await docker.listContainers();
        res.json(containers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list docker containers' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 