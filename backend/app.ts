import express, { type Express, type Request, type Response } from 'express';
import Docker from 'dockerode';

const app: Express = express();
const port = 3000;

const docker = new Docker({
    socketPath: `${process.env.HOME}/.docker/run/docker.sock`,
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/containers/json', async (req: Request, res: Response) => {
    try {
        const containers = await docker.listContainers();
        res.json(containers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list containers' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 