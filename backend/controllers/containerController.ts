import docker from "../docker.ts";

export const fetchContainers = async (req: any, res: any, next: any) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch docker containers" });
  }
};

// TODO: Get Info
export const getContainerInfo = async (req: any, res: any, next: any) => {
  const containers = await docker.getContainer(req.params.id);
  containers.inspect((err, data) => {
    return res.status(200).json(data);
  });
};

// Deletes container
export const deleteContainer = async (req: any, res: any, next: any) => {
  try {
    const container = docker.getContainer(req.params.id);
    const data = await container.inspect();
    await container.remove({ force: true });

    return res.status(200).json({
      success: true,
      message: `Container ${req.params.id} deleted successfully`,
      container: {
        id: data.Id,
        name: data.Name,
        status: data.State.Status,
        startedAt: data.State.StartedAt,
        ports: data.NetworkSettings.Ports,
      },
    });
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 404) {
      return res.status(404).json({ error: "Container ID does not exist" });
    }
    res.status(500).json({ error: "Failed to delete container" });
  }
};

// Starts container
export const startContainer = async (req: any, res: any, next: any) => {
  try {
    const container = docker.getContainer(req.params.id);
    let data = await container.inspect();

    if (!data.State.Running) {
      await container.start();
      data = await container.inspect();
    }

    return res.status(200).json({
      success: true,
      message: `Container ${req.params.id} started successfully`,
      container: {
        id: data.Id,
        name: data.Name,
        status: data.State.Status,
        startedAt: data.State.StartedAt,
        ports: data.NetworkSettings.Ports,
      },
    });
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 404) {
      return res.status(404).json({ error: "Container ID does not exist" });
    }
    res.status(500).json({ error: "Failed to start container" });
  }
};

// Stop container
export const stopContainer = async (req: any, res: any, next: any) => {
  try {
    const container = docker.getContainer(req.params.id);
    const data = await container.inspect();
    if (data.State.Running) {
      await container.stop();
    }
    return res.status(200).json({
      success: true,
      message: `Container ${req.params.id} stopped successfully`,
      container: {
        id: data.Id,
        name: data.Name,
        status: data.State.Status,
        startedAt: data.State.StartedAt,
        ports: data.NetworkSettings.Ports,
      },
    });
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 404) {
      return res.status(404).json({ error: "Container ID does not exist" });
    }
    res.status(500).json({ error: "Failed to stop container" });
  }
};

// Restarts container
export const restartContainer = async (req: any, res: any, next: any) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.restart({ t: 15 });
    let data = await container.inspect();

    return res.status(200).json({
      success: true,
      message: `Container ${req.params.id} stopped successfully`,
      container: {
        id: data.Id,
        name: data.Name,
        status: data.State.Status,
        startedAt: data.State.StartedAt,
        ports: data.NetworkSettings.Ports,
      },
    });
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 404) {
      return res.status(404).json({ error: "Container ID does not exist" });
    }
    res.status(500).json({ error: "Failed to restart container" });
  }
};
