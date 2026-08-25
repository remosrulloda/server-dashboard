import Containers from "./components/Component";
import SideBar from "./components/SideBar";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="content">
      <SideBar />
      <MenuBar />
      <Containers />
    </div>
  )
}

export default App;
