
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ImgGen } from "./page/ImgGen";
import "./App.css";

function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element=<ImgGen/>/>
    </Routes>
  </BrowserRouter>
)
}

export default App;
