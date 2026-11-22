import ContainerList from "./ContainerList";
import MenuBar from "./components/MenuBar";
import { Toaster } from "react-hot-toast";
import './xterm.css';


function App() {
  return (
    <div className="content">
      <MenuBar />
      <Toaster />
      <ContainerList />

    </div>
  )
}

export default App;
