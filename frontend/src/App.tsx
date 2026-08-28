import Containers from "./components/Container";
import SideBar from "./components/SideBar";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="content">
      <MenuBar />
      <Containers />
    </div>
  )
}

export default App;
