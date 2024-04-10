import { BrowserRouter, Routes, Route } from "react-router-dom";

import Universe from "./components/Universe";
import Home from "./components/Home";
import Getdata from "./components/Getdata"


const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Universe />} />
        <Route path ="/teams" element={<Getdata />} />
             </Routes>
    </BrowserRouter>

  );
};

export default App;
