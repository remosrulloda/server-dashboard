interface ContainerProps {
    container: {
        containerName: string,
        status: string,
        port: number,
        link: string
    }
}

export default function Container({ container }: ContainerProps) {
    return (
        <div className="container">
            <h1>{container.containerName}</h1>
            <h2>Status: {container.status}</h2>
            <h3>Port: {container.port}</h3>
            <h3>{container.link}</h3>
        </div>
    );
}