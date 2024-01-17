import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Navbar from "./Components/Navbar";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

function App() {
  return (
    <div>
      <Container>
        <Navbar></Navbar>
        <Row className="justify-content-md-center">
          <Col lg="6">
            <AddTask />
            <TaskList></TaskList>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
