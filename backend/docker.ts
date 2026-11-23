import Docker from "dockerode";

const isMac = process.platform === "darwin";
const socketPath =
  process.env.DOCKER_SOCKET_PATH ||
  (isMac
    ? `${process.env.HOME}/.docker/run/docker.sock`
    : "/var/run/docker.sock");
const docker = new Docker({ socketPath });

export default docker;
