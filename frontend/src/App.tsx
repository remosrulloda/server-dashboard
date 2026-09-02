import ContainerList from "./ContainerList";
import { Toaster } from "react-hot-toast";
import MenuBar from "./components/MenuBar";


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
