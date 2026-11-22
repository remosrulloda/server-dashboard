import { Navbar, Container } from "react-bootstrap";

export default function MenuBar({ userName: string }) {
  let userName: string = "remo";

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="#home">Welcome to your Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{userName}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
